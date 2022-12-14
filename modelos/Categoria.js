let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    objetivo:  {
        type: Number,
        required: true,
        trim: true
    }
}); 

let Cat = mongoose.model("Cat", categoriaSchema);

module.exports = Cat;