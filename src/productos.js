const fs = require('fs')
const filename = './productos.json'

class ProductManager {
//    products

    constructor() {
        this.products = []
    }

    generateID = () => {
        let prod = this.getProducts()
        if (prod.length === 0) return 1
        return prod[prod.length - 1].id + 1

    }



    addProduct(title, description, price, image, code, stock) {
        const id = this.generateID()
        console.log("muestro ID",id)
        const product = {id, title, description, price, image, code, stock}

        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }

        //Valido que el producto ingresado no exista
        const productExists = this.products.some((product) => product.code === code)
        console.log("producto existe ?", productExists)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            this.products.push(product)
            fs.writeFileSync(filename, JSON.stringify(this.products, null, '\t'))
        }
    }

    getProducts() {
        // return this.#products
        const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))

        return contenido
    }

    getProductsById(id) {

        const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))

        return contenido.find(p => p.id == id)
    }

    updateProduct(id, title = '', description, price, image, code, stock) {
        const product = this.products.find((product) => product.id === id)
        if (!product) {
            return console.log('Error: El producto no existe')
        }

        const newProduct = {id, title, description, price, image, code, stock}
        this.products = this.products.map((product) => product.id === id ? newProduct : product)
        fs.writeFileSync(filename, JSON.stringify(this.products, null, '\t'))
    }

    deleteProduct(id) {
        const product = JSON.parse(fs.readFileSync(filename, 'utf-8'))
        const resultado = product.find(p => p.id == +id)
        if (!resultado) {
            return console.log('Error: El producto no existe')
        }
        const newproduct = product.filter(p => p.id !== +id)
        fs.writeFileSync(filename, JSON.stringify(newproduct, null, '\t'))
    }
}

// exporto la clase ProductManager para poder ser usada en el archivo index.js. Esto resuelve el error TypeError: ProductManager is not a constructor
module.exports = ProductManager


// product.addProduct("Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 1)
// // product.addProduct("Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 1)
// product.addProduct("Producto2", "Descripcion2", "Precio2", "Imagen2", "Codigo2", 2)
// product.addProduct("Producto3", "Descripcion3", "Precio3", "Imagen3", "Codigo3", 3)
// product.addProduct("Producto4", "Descripcion4", "Precio4", "Imagen4", "Codigo4", 4)
// product.addProduct("Producto5", "Descripcion5", "Precio5", "Imagen5", "Codigo5", 5)
// product.addProduct("Producto6", "Descripcion6", "Precio6", "Imagen6", "Codigo6", 6)
// product.addProduct("Producto7", "Descripcion7", "Precio7", "Imagen7", "Codigo7", 7)
// product.addProduct("Producto8", "Descripcion8", "Precio8", "Imagen8", "Codigo8", 8)
// product.addProduct("Producto9", "Descripcion9", "Precio9", "Imagen9", "Codigo9", 9)
// product.addProduct("Producto10", "Descripcion10", "Precio10", "Imagen10", "Codigo10", 10)

// const product = new ProductManager()
// product.getProducts()
// product.getProductsById(1)
// product.updateProduct(1, "Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 2)
// product.deleteProduct(1)
