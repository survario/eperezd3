const contentDisposition = require('content-disposition')
const express = require('express')
const app = express()

const Contenedor = require('./clase')

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`servidor iniciado en el puerto ${server.address().port}`)
})

//Creamos la Ruta /productos
app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll()
    //console.log(productos)
    res.send(JSON.stringify(productos))
})

//Creamos la Ruta /productoRandom
app.get('/productoRandom', async (req, res) => {
    const producto = await contenedor.getRandom()
    res.json(producto)
})

//

//Creamos instancia contenedor perteneciente a clase Contenedor
const contenedor = new Contenedor('./productos.txt')

//Utilizamos un método llenar() para agregar los ejemplos
const llenar = async () => {
    console.log('Usamos el método save para guardar tres productos de ejemplo')

    const prod1 = await contenedor.save({
        title: 'Escuadra',                                                                                                                                 
        price: 123.45,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    })

    const prod2 = await contenedor.save({
        title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', 
    })

    const prod3 = await contenedor.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    })
} 

//llenar()