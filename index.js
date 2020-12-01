let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://admin:admin@informacion.xgdwt.mongodb.net/info?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)

let Usuario = require("./modelos/Usuario");
let Egreso = require("./modelos/Egreso");

let db = mongoose.connection;

db.once("open", () => {
    console.log("Conexión con base de datos establecida");
});

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

app.get("/contacto", (req, res) => {
    res.send("Info de contacto");
})

app.get("/usuarios", (req, res) => {
    Usuario.find((err, usuarios) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json({ listaUsuarios: usuarios });
    })
})
app.get("/egresos", (req, res) => {
    Egreso.find((err, egresos) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json({ items: egresos });
    })
})


app.get("/usuarios/nombres", (req, res) => {
    Usuario.find({}, "nombre", (err, usuarios) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json({ listaUsuarios: usuarios });
    })
})

app.get("/usuarios/filtro", (req, res) => {
    Usuario.find({ edad: { $gte: 30 } }, (err, usuarios) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json({ listaUsuarios: usuarios });
    })
})

app.get("/usuario", (req, res) => {
    Usuario.findOne({ nombre: "carlos" }, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})


app.get("/id", (req, res) => {
    Usuario.findById("5fb5a38f84b4bc3a50900825", (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})

app.get("/usuario/:id", (req, res) => {
    Usuario.findById(req.params.id, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})

app.get("/usuarioquery", (req, res) => {
    Usuario.findById(req.query.id, (err, usuario) => {
        if (err) {
            return res.json({ mensaje: "Error al consultar" });
        }
        res.json(usuario);
    })
})

app.get("/auto", (req, res) => {
    res.send(`Marca: ${req.query.marcaauto} - Modelo: ${req.query.modeloauto}`);
})

app.get("/info", (req, res) => {
    res.send(`IP: ${req.ip}<br>
    Ruta: ${req.path}<br>
    Protocolo: ${req.protocol}<br>
    Ruta completa: ${req.url}<br>

    `);
})

app.get("/objeto", (req, res) => {
    res.status(401);
    res.json({ nombre: "Santiago", apellido: "Fagnoni" });
})

app.post("/", (req, res) => {
    res.send("Petición recibida por POST");
})

/* app.post("/insertar", (req, res) => {
    console.log(req.body);

    let persona = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password
    })
    persona.save((err, persona) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(persona);
    }) 
}) */
app.post("/insertar", (req, res) => {
    console.log(req.body);
    let persona = new Usuario({
        correo: req.query.correo,
        clave: req.query.clave
    })
    persona.save((err, persona) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(persona);
    }) 

})

app.post("/insertarEgreso", (req, res) => {
    let item = new Egreso({
        egreso: req.query.egreso,
        categoria: req.query.categoria,
        monto: req.query.monto
    })
   item.save((err, item) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(item);
    }) 
})


app.post("/insertarfijo", (req, res) => {
    let persona = new Usuario({
        nombre: "Alguien",
        apellido: "Algo",
        edad: 33
    })
    persona.save((err, persona) => {
        if (err) return res.json({ mensaje: "Error al insertar" })
        res.json(persona);
    })
})

app.put("/", (req, res) => {
    res.send("Petición recibida por PUT");
})

app.put("/id", (req, res) => {
    Usuario.findByIdAndUpdate("5fc05441237431888b1385e2", { nombre: "richard"}, (err, usuario) => {
        if (err) return res.json({ mensaje: "Error al actualizar" });
        res.json(usuario);
    })
})

app.delete("/", (req, res) => {
    res.send("Petición recibida por DELETE");
})

app.delete("/:id", (req, res) => {
    Usuario.findByIdAndDelete(req.params.id, (err, usuario) => {
        if (err) return res.json({ mensaje: "Error al eliminar" });
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