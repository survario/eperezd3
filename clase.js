const fs = require('fs')

//Creamos la clase Contenedor, su constructor y métodos
class Contenedor {
    constructor(name) {
        this.name = name
    }

    async save(obj) {
        try {
            const content =  fs.readFileSync(this.name)
            const parsedContent = JSON.parse(content)
            obj['id'] = (parsedContent[parsedContent.length -1].id) + 1
            fs.writeFileSync('./productos.txt', JSON.stringify([...parsedContent,obj]))
        } 
        catch (e) {
            fs.writeFileSync('./productos.txt', JSON.stringify([{...obj,id: 1}]))
        }
    }

    //método getAllSync auxiliar para utilizar getById y deleteById
    getAllSync() {
        try {
            const content = fs.readFileSync(this.name)
            return JSON.parse(content)
        } catch (err) {
            console.log('Error de lectura: El archivo está vacío o no se encuentra')
        }
    }

    getById(id) {
        const products = this.getAllSync()
        return products.find(product => id === product.id)      
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile('./productos.txt', 'utf-8')
            return JSON.parse(content)
            //console.log(JSON.parse(content))
        } 
        catch (err) {
            console.log('Error de lectura: El archivo está vacío o no se encuentra')
        }
    }
    
    deleteById(id) {
        try{
        const products = this.getAllSync()
        let product = products.find(product => id === product.id)
        product = {}
        fs.writeFileSyn('./productos.txt', JSON.stringify(product))
        } catch (e) {
            
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile('./productos.txt', '')
            console.log('Todo el contenido del archivo fue eliminado exitosamente')
        } 
        catch (error) {
            console.log('Error al eliminar todo el contenido del archivo')
        }

    }

    async getRandom() {
        const id = Math.floor(Math.random()*(3-1+1)+1)
        return await this.getById(id);
    }
}

module.exports = Contenedor

/*
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

llenar()
*/