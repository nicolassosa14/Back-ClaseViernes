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
const { timeStamp } = require('console');
const port = 4000

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
    } else if (req.url === '/page2') {
        const filePath = path.join(__dirname, './pages/pagina2.html');

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
    } else if (req.url === '/status') {
        // Responder con un mensaje de estado
        res.end(JSON.stringify({ status: 'Servidor en funcionamiento', timeStamp: new Date().toISOString()}));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});