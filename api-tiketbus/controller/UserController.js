'use strict';

const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');


//Registrasi
exports.registerUser = (nama_lengkap, tlpn, username, email, password) =>
    new Promise((resolve,reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({

            nama_lengkap    : nama_lengkap,
            tlpn            : tlpn,
            username        : username,
            email           : email,
            hashed_password : hash,
            created_at      : new Date()
        });

        newUser.save()

            .then(() => resolve({ status: 200, message: 'Berhasil registrasi' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'User atau email sudah terpakai' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

//login
exports.loginUser = (username, password) =>

    new Promise((resolve,reject) => {

        User.find({username: username})

            .then(users => {

                if (users.length == 0) {

                    reject({status: 200, message: 'Periksa email anda' });

                } else {

                    return users[0];

                }
            })

            .then(user => {

                const hashed_password = user.hashed_password;

                if (bcrypt.compareSync(password, hashed_password)) {

                    resolve({ status: 200, message: [ {namalengkap: user.namalengkap, tlpn:user.tlpn, username:user.username, email: user.email }] });

                } else {

                    reject({status: 200, message: 'Periksa kembali password anda' });
                }
            })

            .catch(err => reject({status: 200, message: 'Internal Server Error !' }));

    });

