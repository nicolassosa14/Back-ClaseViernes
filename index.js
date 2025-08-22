/*var EventEmitter = require ('events')
//console.log(EventEmitter)
//console.log(typeof EventEmitter)

const emisorProductos = new EventEmitter();

emisorProductos.on('compra', (texto, precio) => {
    console.log(`Compra realizada con éxito: ${texto} \nPrecio: ${precio}`);
})

emisorProductos.emit('compra', 'Producto 1', 5000); */

/*let PromesaCumplida = true;

const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        if  (PromesaCumplida){
            resolve('Promesa cumplida');
        } else {
            reject('Promesa rechazada');
        }
    }, 3000);
});

miPromesa.then((valor) => {
    console.log(valor);
}).catch((error) => {
    console.log(error);
}) */

const http = require('http');

const path = require('path');
const fs = require('fs');
const port = 3000

// Crear un servidor HTTP que sirva un archivo HTML
const server = http.createServer((req, res) => {

    if (req.url === '/index.html' || req.url === '/' || req.url === '/index') {
        const filePath = path.join(__dirname, './pages/index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al leer el archivo HTML');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/about') {
        const filePath = path.join(__dirname, './pages/about.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al leer el archivo HTML');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/time') {
        // Responder con un mensaje de tiempo actual
        res.end(JSON.stringify({Hora_Servidor: new Date().toISOString()}));
    }
    else if (req.url === '/contact') {
        const filePath = path.join(__dirname, './pages/contact.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error al leer el archivo HTML');
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        }); } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});