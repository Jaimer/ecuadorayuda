const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Case = require('../../models/Case');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const request = require('request');
const LocalStrategy = require('passport-local').Strategy;
const latinize = require('latinize');

router.get('/', (req, res)=>{
    const options = {
        page: 1,
        limit: 24,
        lean: true,
        leanWithId: true,
        collation: {
          locale: 'es'
        }
      };

    Case.paginate({}, options).then(cases => {
        req.app.locals.layout = 'home';
        res.locals.metaTags = {
            title: `Solicita y Entrega Ayuda`
        };
        res.locals.user = req.user? JSON.parse(JSON.stringify(req.user)) : false;
        res.render('home/index', {cases: cases, path: `/casos`});
    });    
});

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'pages';
    res.locals.user = req.user? JSON.parse(JSON.stringify(req.user)) : false;
    next();
});

router.get('/casos/pagina/:pagina', (req, res)=>{
    const options = {
        page: req.params.pagina,
        limit: 24,
        lean: true,
        leanWithId: true,
        collation: {
          locale: 'es'
        }
      };

    Case.paginate({}, options)
    .then(cases => {
        req.app.locals.layout = 'home';
        res.locals.metaTags = {
            title: `Solicita y Entrega Ayuda`
        };
        res.locals.user = req.user? JSON.parse(JSON.stringify(req.user)) : false;
        res.render('home/index', {cases: cases, path: `/casos`});
    });    
});

router.get('/ayudame', (req,res) => {
    res.locals.metaTags = {
        title: `Solicita Ayuda`
    };
    res.render('home/request', {pagetitle: "Solicita Ayuda"});
});

router.post('/ayudame', (req,res) => {
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null){
        return res.render('home/request', {errors: "Captcha Incorrecto", pagetitle: "Solicita Ayuda"});
    }else{
        const secretKey = "6Le-4uQUAAAAAKaxpK0_s4D31Qz4pFUVnUCwru2m";
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;


        request(verificationURL,function(error,response,body) {
            body = JSON.parse(body);
            
            if(body.success !== undefined && !body.success) {
                return res.render('home/request', {errors: {message: "Captcha Incorrecto"}, pagetitle: "Solicita Ayuda"});
              }

            const newCase = new Case({
                name: latinize(req.body.nombre.trim()),
                lastname: latinize(req.body.apellido.trim()),
                phone: latinize(req.body.telefono.trim()),
                state: req.body.provincia.trim(),
                city: req.body.ciudad.trim(),
                email: req.body.email.trim(),
                category: req.body.categoria.trim(),
                description: latinize(req.body.descripcion.trim())
            });
        
            newCase.save().then(savedCase => {
                req.flash('success_message', `Su caso se ha registrado exitosamente` );
                res.redirect('/ayudame');
            }).catch(validator => {
                res.render('home/request', {errors: validator.errors, pagetitle: "Solicita Ayuda"});
            });
        });
    }
});

router.post('/buscar', (req,res) => {
    let provincia = req.body.provincia ? req.body.provincia : "todas";
    let ciudad = req.body.ciudad ? req.body.ciudad : "todas";
    let categoria = req.body.categoria ? req.body.categoria : "todas";
    
    res.redirect(`/filtro/provincia/${provincia}/ciudad/${ciudad}/categoria/${categoria}/pagina/1`)
});

router.get('/filtro/provincia/:provincia/ciudad/:ciudad/categoria/:categoria/pagina/:pagina', (req,res) => {
    let query = {};

    if(!(req.params.ciudad == 'todas')){
        query["city"] = req.params.ciudad;
    }

    if(!(req.params.provincia == 'todas')){
        query["state"] = req.params.provincia;
    }

    if(!(req.params.categoria == 'todas')){
        query["category"] = req.params.categoria;
    }

    const options = {
        page: req.params.pagina,
        limit: 24,
        lean: true,
        leanWithId: true,
        collation: {
          locale: 'es'
        }
    };
    
    Case.paginate(query, options).then(cases => {
        req.app.locals.layout = 'home';
        res.locals.metaTags = {
            title: `Solicita y Entrega Ayuda`
        };
        res.locals.user = req.user? JSON.parse(JSON.stringify(req.user)) : false;
        res.render('home/index', {cases: cases, path: `/filtro/provincia/${req.params.provincia}/ciudad/${req.params.ciudad}/categoria/${req.params.categoria}`});
    });
});

router.get('/caso/:id', (req,res) => {
    Case.findById({"_id": req.params.id}).lean().then(caso => {
        Case.find({category: caso.category}).lean().limit(4).then(related => {
            res.locals.metaTags = {
                title: `${caso.name} necesita ayuda con ${caso.category} en ${caso.city}`
            };
            res.render('home/single', {caso: caso, related: related, pagetitle: `${caso.name} necesita ayuda con ${caso.category} en ${caso.city}`});
        })
    })
});

router.get('/login', (req, res)=>{
    res.render('home/login', {pagetitle:"Iniciar Sesión"});
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) =>{
    User.findOne({email: email}).then(user => {
        if(!user) return done(null, false, {message: 'No user found'});
        bcrypt.compare(password, user.password, (err, matched) => {
            if(err) return err;

            if(matched){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Usuario o contraseña incorrecta'}); 
            }
        });
    });

    passport.serializeUser(function(user, done){
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => {
            done(null,user);
        });
    });
}));

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/login');
});

// router.get('/register', (req, res)=>{
//     res.render('home/register');
// });

// router.post('/register', (req, res)=>{

//     let errors = [];

//     if(!req.body.firstName){
//         errors.push({message: 'Please add your first name'});
//     }
//     if(!req.body.lastName){
//         errors.push({message: 'Please add your last name'});
//     }
//     if(!req.body.email){
//         errors.push({message: 'Please add your email'});
//     }
//     if(!req.body.password){
//         errors.push({message: 'Please add your password'});
//     }
//     if(req.body.password !== req.body.passwordConfirm){
//         errors.push({message: 'Please add your password'});
//     }

//     if(errors.length > 0){
//         res.render('home/register', {
//             errors: errors,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email
//         });
//     }else{
//         User.findOne({email: req.body.email}).then(user => {
//                 if(!user){
//                     const newUser = new User({
//                         firstName: req.body.firstName,
//                         lastName: req.body.lastName,
//                         email: req.body.email,
//                         password: req.body.password,
//                     });
                    
//                     bcrypt.hash(newUser.password, 10, (err, hash) =>{
                        
//                         newUser.password = hash;
            
//                         newUser.save().then(savedUser => {
//                             req.flash('success_message', 'You are now registered, please login');
//                             res.redirect('/login');
//                         });
//                     });
//                 }else{
//                     req.flash('error_message', 'That email exists please login');
//                     res.redirect('/login');
//                 }
//         });
//     }
// });

module.exports = router;