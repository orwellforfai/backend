import fs from 'fs'

const filename = './src/storage/productos.json'

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
        const lista = this.getProducts()
        const id = this.generateID()
        console.log("muestro ID", id)
        const product = {id, title, description, price, image, code, stock}

        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }

        //Valido que el producto ingresado no exista
        const productExists = lista.some((product) => product.code === code)
        console.log("producto existe ?", productExists)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            lista.push(product)
            fs.writeFileSync(filename, JSON.stringify(lista, null, '\t'))
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

    updateProduct(id, title, description, price, image, code, stock) {
        //const product = this.products.find((product) => product.id == id)
        const list = this.getProducts()
        const product = list.findIndex((p) => p.id == id)
        if (!product) {
            return console.log('Error: El producto no existe')
        }

        const newProduct = {id, title, description, price, image, code, stock}
        console.log(newProduct)
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

export default ProductManager

