const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// This line handles both the function and the object-wrap case
userSchema.plugin(typeof passportLocalMongoose === 'function' ? passportLocalMongoose : passportLocalMongoose.default);

module.exports = mongoose.model("User", userSchema);