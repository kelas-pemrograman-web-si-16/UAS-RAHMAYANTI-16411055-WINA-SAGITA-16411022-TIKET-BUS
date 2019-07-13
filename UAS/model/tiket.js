const mongoose = require('mongoose');
const tiketSchema = mongoose.Schema({
    kodetiket       : {type: String, unique: true},
    asal 	    	: String,
    tujuan 	        : String,
    waktu_berangkat  : String,
    waktu_tiba  : String,
    harga	        : String,
    created_at		: String
});

module.exports = mongoose.model('tiket', tiketSchema);

