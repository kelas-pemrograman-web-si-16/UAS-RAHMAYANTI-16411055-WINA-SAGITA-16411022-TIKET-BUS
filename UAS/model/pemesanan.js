const mongoose = require('mongoose');
const PemesananSchema = mongoose.Schema({
    kode_pesan       : {type: String, unique: true},
    asal 	            	: String,
    tujuan 	              : String,
    tanggal_berangkat	  : Date,
    kursi	              : String,
    created_at	        	: String
});

module.exports = mongoose.model('Pemesanan', PemesananSchema);

