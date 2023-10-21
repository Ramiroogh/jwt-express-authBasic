const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// RUTA example
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs en jwt",
    })
})

// Ruta de LOGIN.
// Para guardar el Token, usaremos LocalStorage.
app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Ramiro",
        email: "ramiro@gmail.com"
    }

    // Se agrega un segundo parametro, que actua de Expirar el Token.
    jwt.sign({user},'secretKey', {expiresIn: '32s'}, (err, token) => {
        res.json({
            token
        });
    });
});

// Ruta de Verificación.

app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if(error) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: "Post fue creado",
                authData // es igual a authData: authData
            })
        }
    })
})

// Authorization: Bearer <token>
function verifyToken(req, res, next) { // Next es una funcion que se ejecuta cuando lo demas salio bien.
    const bearerHeader = req.headers['authorization'];

    // comparamos el valor del tipado de una variable con "TYPEOF"
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        // Seteamos el Token
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, function() {
    console.log('nodejs app running...')
})