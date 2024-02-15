const express = require('express');
const router = express.Router();
const User =  require('../models/user.js');


router.get('/', (req,res) => {
    res.render('landing');
});

router.get('/signup', (req,res) => {
    console.log('running...')
    console.log(__dirname);
    // res.send('test');
    
    res.render('signup');
})

router.get('/login', (req,res) => {
    console.log(__dirname);    
    res.render('login');
})

router.post('/signup', (req,res) => {
    console.log(req.body.name,req.body.username,req.body.password);
    User.create(req.body)
    .then(user => res.render('login'))
    .catch(err => res.status(400).json({error:'cant add note'}));
});

router.post('/login', async  (req,res) => {
    console.log(req.body.username,req.body.password);
    await User.findOne({ username: req.body.username})
    .then(
        doc => {
            console.log(doc.username,doc.password);
            if (doc.password === req.body.password) {
                res.render('main',
                {
                    username: doc.username,
                });
            }        
        }
    );
});

module.exports = router;