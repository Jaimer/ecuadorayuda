const express = require('express');
const router = express.Router();
const faker = require('faker');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    res.locals.curuser = JSON.parse(JSON.stringify(req.user));
    next();
});

router.get('/', (req, res)=>{
    //res.render('admin/index', {user: req.user});
    res.redirect('admin/properties');
});

module.exports = router;