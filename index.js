let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.set('useCreateIndex', true);
/* mongoose.connect("mongodb+srv://admin:admin@informacion.xgdwt.mongodb.net/info?retryWrites=true&w=majority",
    { useNewUrlParser: true }
) */
mongoose.connect("mongodb+srv://sededege:gagetere@cluster0.krvpmpm.mongodb.net/test",
    { useNewUrlParser: true }
)

let Cat = require("./modelos/Categoria");
let User = require("./modelos/User");
let Dato = require("./modelos/Dato");


let db = mongoose.connection;

db.once("open", () => {
    console.log("Conexión con base de datos establecida");
});


//middlwarees
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
    console.log("Por Middleware");
    next();
})

app.get("/", (req, res) => {
    res.send("Bienvenido/a al inicio");
})


app.get("/usuarios", (req, res) => {
    User.find((err, usuarios) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json({ listaUsuarios: usuarios });
    })
})
app.get("/datos", (req, res) => {
    Dato.find((err, items) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.status(200).json(items);
    })
})
app.get("/categorias", (req, res) => {
    Cat.find((err, items) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.status(200).json(items);
    })
})



app.post("/usuario", (req, res) => {
    User.findOne({ usuario: req.body.user, password: req.body.pass }, (err, usuarioo) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuarioo);
    })

})
app.post("/usuariorepetido", (req, res) => {
    User.findOne({ usuario: req.body.usuario }, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })

})


app.get("/:id", (req, res) => {
    Dato.findById(req.params.id, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})
app.get("/obj/:id", (req, res) => {
    Cat.findById(req.params.id, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})





app.post("/insertarDato", (req, res) => {
    let item = new Dato({
        detalle: req.body.detalle,
        categoria: req.body.categoria,
        moneda: req.body.moneda,
        monto: req.body.monto,
        tipo: req.body.tipo,
        fecha: req.body.fecha
    })
    item.save((err, item) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(item);
    })
})

app.post("/insertarCat", (req, res) => {
    console.log(req.body)
    let item = new Cat({
        categoria: req.body.categoria,
        objetivo: req.body.objetivo,
    })
    item.save((err, item) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(item);
    })
})


app.post("/insertarfijo", (req, res) => {
    let persona = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        password:req.body.password
    })
    persona.save((err, persona) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(persona);
    })
})


app.put("/:id", (req, res) => {
    Dato.findByIdAndUpdate(req.params.id, {
        detalle: req.body.detalle,
        categoria: req.body.categoria,
        moneda: req.body.moneda,
        monto: req.body.monto,
        tipo: req.body.tipo,
        fecha: req.body.fecha
    }, (err, usuario) => {
        if (err) return res.json({ mensaje: "Error al actualizar" });
        res.json(usuario);
    })
})

app.put("/obj/:id", (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, {
        objetivo: req.body.objetivo
    }, (err, usuario) => {
        if (err) return res.json({ mensaje: "Error al actualizar" });
        res.json(usuario);
    })
})


app.delete("/:id", (req, res) => {
    Dato.findByIdAndDelete(req.params.id, (err, usuario) => {
        if (err) return res.json({ mensaje: "Error al eliminar" });
        console.log(usuario);
        res.json(usuario);
    })
})



//404
app.use((req, res, next) => {
    console.log("404");
    res.send("404");
})

let puerto = process.env.PORT || 3000;

app.listen(puerto, () => console.log("Servidor corriendo en puerto 3000"));

