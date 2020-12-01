let unaPersona = {
    nombre: 'Front test',
    apellido: 'Front apelldio test',
    edad: 16
};

/* fetch("http://localhost:3000/insertar", {
    method: "POST",
    body: JSON.stringify(unaPersona),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json())
    .then(usuario => {
        console.log(usuario);
    }) */

    fetch("http://localhost:3000/usuarios", {
  
}).then(r => r.json())
    .then(usuario => {
        console.log(usuario);
    })