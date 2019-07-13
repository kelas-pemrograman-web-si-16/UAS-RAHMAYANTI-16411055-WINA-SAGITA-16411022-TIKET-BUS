var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Pemesanan = require('../model/pemesanan')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/pemesanan', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    })
});


/* GET users listing. */
router.get('/datapesan', Auth_middleware.

    check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Pemesanan.find({}, function(err, pemesanan) {
        console.log(pemesanan);
        res.render('users/pemesanan/ps_table', { session_store: session_store, pemesanans: pemesanan })
    }).select('_id kode_pesan asal tujuan tanggal_berangkat kursi created_at')
});

/* GET users listing. */
router.get('/inputpesan', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session
    res.render('users/pemesanan/ps_user', { session_store: session_store})
});

//input data pesan
router.post('/inputpesan', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Pemesanan.find({ kode_pesan: req.body.kode_pesan }, function(err, pemesanan) {
        if (pemesanan.length == 0) {
            var datapesan = new Pemesanan({
                kode_pesan: req.body.kode_pesan,
                asal: req.body.asal,
                tujuan: req.body.tujuan,
                tanggal_berangkat: req.body.tanggal_berangkat,
                kursi: req.body.kursi,
            })
            datapesan.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datapesan')
                } else {
                    req.flash('msg_info', 'Data telah berhasil dibuat')
                    res.redirect('/datapesan')
                }
            })
        } else {
            //req.flash('msg_error', 'Maaf, data sudah ada....')
            res.render('users/pemesanan/ps_user', {
                session_store: session_store,
                kode_pesan: req.body.kode_pesan,
                asal: req.body.asal,
                tujuan: req.body.tujuan,
                tanggal_berangkat: req.body.tanggal_berangkat,
                kursi: req.body.kursi
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editpesan', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Pemesanan.findOne({ _id: req.params.id }, function(err, pemesanan) {
        if (pemesanan) {
            console.log("pemesananssss"+pemesanan);
            res.render('users/pemesanan/ps_user', { session_store: session_store, pemesanans: pemesanan })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datapesan')
        }
    })
})

router.post('/:id/editpesan', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Pemesanan.findById(req.params.id, function(err, pemesanan) {
        pemesanan.kode_pesan = req.body.kode_pesan;
        pemesanan.asal = req.body.asal;
        pemesanan.tujuan = req.body.tujuan;
        pemesanan.tanggal_berangkat= req.body.tanggal_berangkat;
        pemesanan.kursi = req.body.kursi;

        pemesanan.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }
            res.redirect('/datapesan');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    Pemesanan.findById(req.params.id, function(err, pemesanan){
        pemesanan.remove(function(err, pemesanan){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data berhasil dihapus!');
            }
            res.redirect('/datapesan');
        })
    })
})



module.exports = router;