var express = require('express');

var router = express.Router();

var express = require('express');
var crypto = require('crypto');
var User = require('../model/user');
var Auth_mdw = require('../middlewares/auth');

var router = express.Router();
var secret = 'rahasia';
var session_store;

router.get('/', Auth_mdw.is_login, function(req, res, next) {
    session_store = req.session;
    res.render('index', { title: 'selamat datang', session_store:session_store });
});

//view Login
router.get('/login',Auth_mdw.is_login, function(req, res, next) {
    res.render('index');
});

//fungsi login
router.post('/login', function(req, res, next) {
    session_store = req.session
    var password = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex')
    if (req.body.username == '' || req.body.password == '') {
        req.flash('info', 'Maaf, tidak boleh ada field yang kosong')
        res.redirect('/login')
    }
    else {
        User.find({
            username: req.body.username,
            password: password
        }, function(err, user) {
            if (err) throw err

            if (user.length > 0) {
                session_store.username = user[0].username
                session_store.email = user[0].email
                session_store.admin = user[0].admin
                session_store.nama_lengkap = user[0].nama_lengkap
                session_store.logged_in = true

                if(user[0].admin == true){
                    res.redirect('/admin')
                }else {
                    res.redirect('/pemesanan')
                }
            } else {
                req.flash('info', 'Kayaknya akun Anda salah')
                res.redirect('/login')
                console.log(req.body.username)
            }
        })
    }
})

//view registrasi
router.get('/regis', function(req, res, next) {
    res.render('regis');
});

//fungsi registrasi
router.post('/regis', function(req, res, next) {
    session_store = req.session
    var password = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex')

    if (req.body.username == '' || req.body.password == '' || req.body.email == ''
        || req.body.nama_lengkap == '' || req.body.tlpn == '') {
        req.flash('info', 'Maaf, tidak boleh ada field yang kosong')
        res.redirect('/regis')
    }
    else {
        User.find({username:req.body.username}, function (err, user){
            if (user.length == 0)
            {
                var member = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: password,
                    nama_lengkap: req.body.nama_lengkap,
                    tlpn: req.body.tlpn,
                    admin: false,
                });

                member.save(function(err) {
                    if (err) throw err;

                    console.log('Member is created!');
                });
                req.flash('info', 'Berhasil menambah akun')
                res.redirect('/login')
            }else {
                req.flash('info', 'Maaf, username sudah terpakai')
                res.redirect('/regis')
            }
        });
    }
})

//logout
router.get('/logout', function(req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/login');
        }
    });
});

// router.get('/datauser', Auth_mdw.
//
//     check_login, Auth_mdw.is_admin, function(req, res, next) {
//     session_store = req.session
// //
//     User.find({}, function(err, user) {
//         console.log(user);
//         res.render('users/pemesanan/ps_datam', { session_store: session_store, users: user })
//     }).select('_id nama_lengkap tlpn username email password created_at')
// });
//
//
// //menampilkan data berdasarkan id
// router.get('/:id/edituser', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
//     session_store = req.session
//
//     User.findOne({ _id: req.params.id }, function(err, user) {
//         if (user) {
//             console.log("usersss"+user);
//             res.render('users/pemesanan/ps_editm', { session_store: session_store, users: user })
//         } else {
//             req.flash('msg_error', 'Maaf, Data tidak ditemukan')
//             res.redirect('/datauser')
//         }
//     })
// })
//
// router.post('/:id/edituser', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
//     session_store = req.session
//
//     User.findById(req.params.id, function(err, user) {
//         user.nama_lengkap = req.body.nama_lengkap;
//         user.tlpn = req.body.tlpn;
//         user.username = req.body.username;
//         user.email = req.body.email;
//         user.password= req.body.password;
//
//         user.save(function(err, user) {
//             if (err) {
//                 req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
//             } else {
//                 req.flash('msg_info', 'Edit data berhasil!');
//             }
//             res.redirect('/datauser');
//
//         });
//     });
// })
//
// router.post('/:id/delete', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
//     User.findById(req.params.id, function(err, user){
//         user.remove(function(err, user){
//             if (err)
//             {
//                 req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
//             }
//             else
//             {
//                 req.flash('msg_info', 'Data berhasil dihapus!');
//             }
//             res.redirect('/datauser');
//         })
//     })
// })


//rahasisa
router.get('/secreta', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
    session_store = req.session;
    res.render('secret');
});

router.get('/secretm', Auth_mdw.check_login, Auth_mdw.is_member, function(req, res, next) {
    session_store = req.session;
    res.render('secret');
});


module.exports = router;