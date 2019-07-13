const mongoose = require('mongoose');
const pesanSchema = mongoose.Schema({
    kode_pesan       : {type: String, unique: true},
    asal 	            	: String,
    tujuan 	              : String,
    tanggal_berangkat	  : Date,
    kursi	              : String,
    created_at	        	: String
});
module.exports = mongoose.model('pesanModel', pesanSchema);