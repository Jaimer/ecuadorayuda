const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {select, generateDate, featureList, pagination, compare} = require('./helpers/handlebars-helpers');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const {mongoDBURL} = require('./config/database');
const passport = require('passport');
const compression = require('compression');
const MongoStore = require('connect-mongo')(session);
const mollify = require('mollify');
const port = process.env.PORT || 4500;

//MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true}).then(db => {
    console.log('DB Connected');
}).catch(error => console.log('Could not connect to DB: ' + error));
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

//Middlewares
app.use(compression());
app.use(mollify({dir: __dirname}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(upload());
app.use(session({
    secret: 'bienesareasessionsecret123',
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db, 
        ttl: 24 * 60 * 60
    })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((err,req,res,next) => {
    if(err){
        req.logout();
        res.redirect("/"); //failed to deserialize user fix
    }else{
        next();
    }
});

//Local Variables Using Middleware
app.use((req,res,next) =>{
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    next();
})
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate, featureList: featureList, pagination: pagination, compare: compare}}));
app.set('view engine', 'handlebars');

//Main Routes
const main = require('./routes/home/index');
const admin = require('./routes/admin/index');

app.use('/', main);
app.use('/admin', admin);

//Launch App
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});