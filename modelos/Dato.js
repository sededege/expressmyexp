let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let datoSchema = new Schema({
   detalle: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    moneda:  {
        type: String,
        required: true,
        trim: true
    },
    monto:  {
        type: Number,
        required: true,
        trim: true
    },
    tipo:  {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: String,
        //default: Date.now
      },
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
let Dato = mongoose.model("Dato", datoSchema);

module.exports = Dato;