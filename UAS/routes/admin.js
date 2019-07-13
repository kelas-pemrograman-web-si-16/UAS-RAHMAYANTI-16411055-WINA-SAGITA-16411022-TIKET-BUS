var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Member = require('../model/user')
var Tiket = require('../model/tiket')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    }).select('username password users createdAt updatedAt')
});

/* GET users listing. */
router.get('/datatiket', Auth_middleware.

    check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tiket.find({}, function(err, tiket) {
        console.log(tiket);
        res.render('users/tiket/table', { session_store: session_store, tikets: tiket })
    }).select('_id kodetiket asal tujuan waktu_berangkat waktu_tiba harga created_at')
});

/* GET users listing. */
router.get('/inputtiket', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/tiket/input_data', { session_store: session_store})
});

//input data buku
router.post('/inputtiket', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tiket.find({ kodetiket: req.body.kodetiket }, function(err, tiket) {
        if (tiket.length == 0) {
            var datatiket = new Tiket({
                kodetiket: req.body.kodetiket,
                asal: req.body.asal,
                tujuan: req.body.tujuan,
                waktu_berangkat: req.body.waktu_berangkat,
                waktu_tiba: req.body.waktu_tiba,
                harga: req.body.harga,
            })
            datatiket.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datatiket')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datatiket')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode buku sudah ada....')
            res.render('users/tiket/input_data', {
                session_store: session_store,
                kodetiket: req.body.kodetiket,
                asal: req.body.asal,
                tujuan: req.body.tujuan,
                waktu_berangkat: req.body.waktu_berangkat,
                waktu_tiba: req.body.waktu_tiba,
                harga: req.body.harga
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/edittiket', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tiket.findOne({ _id: req.params.id }, function(err, tiket) {
        if (tiket) {
            console.log("tiketsss"+tiket);
            res.render('users/tiket/edit_data', { session_store: session_store, tikets: tiket })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datatiket')
        }
    })
})

router.post('/:id/edittiket', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tiket.findById(req.params.id, function(err, tiket) {
        tiket.kodetiket = req.body.kodetiket;
        tiket.asal = req.body.asal;
        tiket.tujuan = req.body.tujuan;
        tiket.waktu_berangkat= req.body.waktu_berangkat;
        tiket.waktu_tiba= req.body.waktu_tiba;
        tiket.harga = req.body.harga;

        tiket.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }
            res.redirect('/datatiket');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Tiket.findById(req.params.id, function(err, tiket){
        tiket.remove(function(err, tiket){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data buku berhasil dihapus!');
            }
            res.redirect('/datatiket');
        })
    })
})


/* GET users listing. */
router.get('/datauser', Auth_middleware.

    check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
//
    Member.find({}, function(err, member) {
        console.log(member);
        res.render('users/member/ps_datam', { session_store: session_store, users: member })
    }).select('_id nama_lengkap tlpn username email password created_at')
});


//menampilkan data berdasarkan id
router.get('/:id/edituser', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Member.findOne({ _id: req.params.id }, function(err, member) {
        if (member) {
            console.log("usersss"+member);
            res.render('users/member/ps_editm', { session_store: session_store, users: member })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datauser')
        }
    })
})

router.post('/:id/edituser', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Member.findById(req.params.id, function(err, member) {
        member.nama_lengkap = req.body.nama_lengkap;
        member.tlpn = req.body.tlpn;
        member.username = req.body.username;
        member.email = req.body.email;


        member.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }
            res.redirect('/datauser');

        });
    });
})

router.post('/:id/deletemember', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Member.findById(req.params.id, function(err, member){
        member.delete(function(err, member){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data berhasil dihapus!');
            }
            res.redirect('/datauser');
        })
    })
})



module.exports = router;
