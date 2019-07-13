'use strict';

const pesanController = require('../controller/pesanController')


module.exports = router => {

    //input pesan
    router.post('/inputpesan', (req, res) => {

        const kode_pesan      = req.body.kode_pesan;
        const asal            = req.body.asal;
        const tujuan         = req.body.tujuan;
        const tanggal_berangkat         = req.body.tanggal_berangkat;
        const kursi           = req.body.kursi;
        console.log(req.body);

        if (!kode_pesan || !asal || !tujuan ||  !tanggal_berangkat || !kursi.trim() || !kode_pesan.trim()
            || !asal.trim() ||  !tujuan.trim  || !tanggal_berangkat.trim()  || !kursi.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            pesanController.inputpesan(kode_pesan, asal, tujuan, tanggal_berangkat, kursi)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })

                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //get pesan
    router.get('/datapesan', (req, res) => {

        pesanController.datapesan()
            .then(result => {
                console.log(result)
                res.status(result.status).json({message: result.message})
            })

            .catch(err => res.status(err.status).json({message: err.message}));
    });


    //input pesan
    router.post('/updatepesan', (req, res) => {

        const kode_pesan      = req.body.kode_pesan;
        const asal            = req.body.asal;
        const tujuan         = req.body.tujuan;
        const tanggal_berangkat         = req.body.tanggal_berangkat;
        const kursi           = req.body.kursi;


        if (!kode_pesan || !asal || !tujuan ||  !tanggal_berangkat || !kursi.trim() || !kode_pesan.trim()
            || !asal.trim() ||  !tujuan.trim  || !tanggal_berangkat.trim()  || !kursi.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            pesanController.updatepesan(kode_pesan, asal, tujuan, tanggal_berangkat, kursi)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //hapus
    router.post('/delete', (req, res) => {

        const kode_pesan      = req.body.kode_pesan;

        if (!kode_pesan || !kode_pesan.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            pesanController.delete(kode_pesan)

                .then(result => {
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

}
