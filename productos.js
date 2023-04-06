const fs = require('fs')
const filename = './productos.json'

class ProductManager {
    #products

    constructor() {
        this.#products = []
    }

    #generateID = () => {
        if (this.#products.length === 0) return 1
        return this.#products[this.#products.length - 1].id + 1
    }

    addProduct(title, description, price, image, code, stock) {
        const id = this.#generateID()
        const product = {id, title, description, price, image, code, stock}

        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }

        //Valido que el producto ingresado no exista
        const productExists = this.#products.some((product) => product.code === code)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            this.#products.push(product)
            fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
        }
    }

    getProducts() {

        // return this.#products

        const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))
        console.log(" Muestro el contenido del archivo Productos", contenido)
    }

    getProductsById(id) {

        const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))

        console.log("Muestro el contenido del ID elegido", contenido.find(p => p.id === id))

    }
    updateProduct(id, title, description, price, image, code, stock) {
        const product = this.#products.find((product) => product.id === id)
        if (!product) {
            return console.log('Error: El producto no existe')
        }

        const newProduct = {id, title, description, price, image, code, stock}
        this.#products = this.#products.map((product) => product.id === id ? newProduct : product)
        fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
    }

    deleteProduct(id) {
        const product = JSON.parse(fs.readFileSync(filename, 'utf-8'))
        product.find(p => p.id === id)
        if (!product) {
            return console.log('Error: El producto no existe')
        }
        const newproduct = product.filter(p => p.id !== id)
        fs.writeFileSync(filename, JSON.stringify(newproduct, null, '\t'))
    }
}

const product = new ProductManager()
product.addProduct("Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 1)
product.addProduct("Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 1)
product.addProduct("Producto2", "Descripcion2", "Precio2", "Imagen2", "Codigo2", 2)
product.getProducts()
product.getProductsById(1)
product.updateProduct(1, "Producto1", "Descripcion1", "Precio1", "Imagen1", "Codigo1", 2)
product.deleteProduct(1)
