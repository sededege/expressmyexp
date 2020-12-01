let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
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
    email:  {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        trim: true
    }
}); 

/* let usuarioSchema = new Schema({
  
    correo:  {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        trim: true
    }
}); */
let Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;