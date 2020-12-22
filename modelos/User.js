let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    usuario:  {
        type: String,
        required: true,
        trim: true
    },
    password:  {
        type: String,
        required: true,
        trim: true
    }
}); 

let User = mongoose.model("User", userSchema);

module.exports = User;