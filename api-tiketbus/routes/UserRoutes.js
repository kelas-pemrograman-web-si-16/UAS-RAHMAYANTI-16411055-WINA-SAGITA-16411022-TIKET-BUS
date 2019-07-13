'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const register = require('../controller/UserController');
const login = require('../controller/UserController');
const config = require('../config/config');

module.exports = router => {

    router.get('/', (req, res) => res.end('Api its work !'));


    //login user
    router.post('/login', (req, res) => {
        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({success : false,message: 'Invalid Request !'});

        } else {
            //
            login.loginUser(credentials.name, credentials.pass)

                .then(result => {
                    const token = jwt.sign(result, config.secret, {expiresIn: 50000});
                    user.update(
                        { "email": result.message.email}, // Filter
                        {"api_token": token}, // Update
                        {upsert: true}) // add document with req.body._id if not exists
                    res.status(result.status).json({success : true,message: result.message, token : token});

                })

                .catch(err => res.status(err.status).json({success: false, message: err.message}));
        }
    });


    //register user
    router.post('/regis', (req, res) => {

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const nama_lengkap = req.body.nama_lengkap;
        const tlpn = req.body.tlpn;


        if (!username || !email || !password || !nama_lengkap ||  !tlpn || !username.trim()
            || !email.trim() || !password.trim() || !nama_lengkap.trim() || !tlpn.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            register.registerUser(username, email, password, nama_lengkap, tlpn )

                .then(result => {

                    res.setHeader('Location', '/UserModel/' + username);
                    res.status(result.status).json({message: result.message})
                })

                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

}
