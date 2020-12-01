let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let egresoSchema = new Schema({
    egreso: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    monto:  {
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
let Egreso = mongoose.model("Egreso", egresoSchema);

module.exports = Egreso;