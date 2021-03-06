const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    google_id: { type: String, required: true, unique: true },               // per user from google sign in
    isAdmin: { type: Boolean, required: true ,default: false}        // admin or client
});

// read user by id_token that send in the body request and create by google sign in
userSchema.statics.findUser = function (google_id) {
    return this.find({ google_id: google_id }, function (err) {
        if (err) {
            throw err;
        }
    });
}

// create client user by sending id_token , authorization set to client by default
userSchema.statics.createNewClientUser = async function (google_id) {
    let userObj = new this({
        google_id: google_id
    });
    return await userObj.save();
}

const userModel = model('users', userSchema);

module.exports = userModel;



