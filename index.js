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
const url = require('url')
const {IncomingForm, formidable} = require('formidable');


// Crear un servidor HTTP que sirva un archivo HTML
const server = http.createServer((req, res) => {

    const parseUrl = url.parse(req.url, true)
    const pathname = parseUrl.pathname;

    switch (pathname){
        case '/':
            ServirHTML('index.html', res);
            break;
        case '/contact':
            ServirHTML('contact.html', res)
            break;
        case '/about':
            ServirHTML('about.html', res)
            break;
        case '/time':
            mostrarhora(res)
            break;
        case '/upload':
            if(req.method === 'GET'){
                ServirHTML('SubirArch.html', res)
            }if(req.method === 'POST'){
                capturarArch(req, res);
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Ruta no encontrada');
    }
    // if (req.url === '/index.html' || req.url === '/' || req.url === '/index') {
    //     const filePath = path.join(__dirname, './pages/index.html');

    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end('Error al leer el archivo HTML');
    //         }
    //         else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.end(data);
    //         }
    //     });
    // } else if (req.url === '/about') {
    //     const filePath = path.join(__dirname, './pages/about.html');

    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end('Error al leer el archivo HTML');
    //         }
    //         else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.end(data);
    //         }
    //     });
    // } else if (req.url === '/time') {
    //     res.end(JSON.stringify({Hora_Servidor: new Date().toISOString()}));
    // }
    // else if (req.url === '/contact') {
    //     const filePath = path.join(__dirname, './pages/contact.html');
    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             res.writeHead(500, {'Content-Type': 'text/plain'});
    //             res.end('Error al leer el archivo HTML');
    //         }
    //         else{
    //             res.writeHead(200, {'Content-Type': 'text/html'});
    //             res.end(data);
    //         }
    //     }); }
    //     else if (req.url == '/public'){
    //         res.end(JSON.stringify({Public: 'Aca va el public'}));
    //     }
    //     else {
    //     res.writeHead(404, { 'Content-Type': 'text/plain' });
    //     res.end('Ruta no encontrada');
    // }
});

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

function ServirHTML(NombreArchivo, res) {
    const ruta = path.join('pages', NombreArchivo);
    fs.readFile(ruta, 'utf8', (err, data) =>{
        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error interno: ${err}`)
        }else{
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(data)
        }
    })
}

function mostrarhora (res){
                res.end(JSON.stringify({Hora_Servidor: new Date().toISOString()}));
}

function capturarArch(req, res){
    const form = formidable({ multiples: false, uploadDir: "./public", keepExtensions: true });
    
        form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error en la subida");
            return;
        }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ fields, files }, null, 2));
        });
}