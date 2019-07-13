const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    nama_lengkap 	    : String,
    tlpn                : String,
    username 			: {type: String, unique: true},
    email			    : {type: String, unique: true},
    hashed_password	    : String,
    created_at		    : String,
    temp_password	    : String,
    temp_password_time  : String,
    api_token           : String
});
module.exports = mongoose.model('user', userSchema);