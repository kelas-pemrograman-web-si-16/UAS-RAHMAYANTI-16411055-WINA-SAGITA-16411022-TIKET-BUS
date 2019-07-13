'use strict'

const pesan = require('../model/pesanModel')

exports.inputpesan = (kode_pesan, asal, tujuan,  tanggal_berangkat, kursi) =>
    new Promise((resolve,reject) => {


        const data = new pesan({

            kode_pesan       : kode_pesan,
            asal             : asal,
            tujuan           : tujuan,
            tanggal_berangkat: tanggal_berangkat,
            kursi            : kursi,
            created_at     : new Date()
        });

        data.save()

            .then(() => resolve({ status: 200, message: 'Berhasil memesan tiket' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'Kode pemesanan sudah ada' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

exports.datapesan = ()=>
    new Promise((resolve, reject)=>{
        pesan.find()
            .then(pemesanans => {
                if (pemesanans.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: pemesanans});
                }
            })

    });

exports.updatepesan = (kode_pesan, asal, tujuan,  tanggal_berangkat, kursi) =>
    new Promise((resolve,reject) => {

        const kode_pesan = ({
            kode_pesan : kode_pesan
        });

        const datapesan = ({
            asal   : asal,
            tujuan  : tujuan,
            tanggal_berangkat        : tanggal_berangkat,
            kursi   : kursi,
            created_at   : new Date()
        });


        pesan.update(kode_pesan, datapesan)

            .then(() => resolve({

                status: 200, message: 'Berhasil update pemesanan tiket'

            }))

            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.hapuspesan = (kode_pesan) =>
    new Promise((resolve,reject) => {

        const kode_pesan = ({
            kode_pesan : kode_pesan
        });

        pesan.remove(kode_pesan)

            .then(() => resolve({ status: 200, message: 'Data berhasil dihapus' }))

            .catch(err => {

                reject({ status: 200, message: 'Gagal' });
            });
    });

