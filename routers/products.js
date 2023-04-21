import {Router}  from "express";

const router = Router();


router.get('/', (request, response) => {
    response.send('<h1 style="color:goldenrod">Bienvenidos a la pagina de productos!!</h1>');
})

// Uso de limit a la hora de mostrar los productos, si no se escibe el limite se muestran todos.
// lo llamo asi: http://localhost:8080/products?limit=5
// o asi http://localhost:8080/products para obtener todos.
router.get('/products', (request, response) => {
    const productManager = new ProductManager()
    const productos = productManager.getProducts()
    const limit = request.query.limit
    console.log("Limite", limit)
    console.log("Productos", productos)

    let data = productos.slice(0, limit);
    response.send({
        message: "Metodo Limite OK",
        data: data
    })
})

// por url param http://localhost:8080/product/5
router.get('/product/:id', (request, response) => {
    const productManager = new ProductManager()
    const id = request.params.id
    const data = productManager.getProductsById(id)

    response.send({
        message: "Metodo ID OK",
        data: data
    })
})

// por query param: http://localhost:8080/id?id=5
router.get('/id', (request, response) => {
    const productManager = new ProductManager()
    const id = request.query.id
    const data = productManager.getProductsById(id)

    response.send({
        message: "x query id OK",
        data: data
    })
})

router.delete('/product/:id', (request, response) => {
    const productManager = new ProductManager()
    const id = request.params.id
    const data = productManager.deleteProduct(id)

    response.send({
        message: "Metodo DELETE OK",
        data: data
    })
})

router.post('/product', (request, response) => {
    const productManager = new ProductManager()
    const data = productManager.addProduct("Producto 5", "Descripcion 5", 5, "imagen5", "Codigo5", 5)

    response.send({
        message: "Metodo POST OK",
        data: data,
        status: 201
    })
})

router.post('/newproduct', (request, response) => {
    const productManager = new ProductManager()
    const body = request.body
    console.log("Body", body)
    const data = productManager.addProduct(body.title, body.description, body.price, body.image, body.code, body.stock)

    response.send({
        message: "Metodo POST con Body en JSON OK",
        data: data,
        status: 201
    })

})

router.put('/product/:id', (request, response) => {
    const productManager = new ProductManager()
    const id = request.params.id
    console.log("id a modificar",id)
    const body = request.body
    console.log("Body", body)
    const data = productManager.updateProduct(id, body.title, body.description, body.price, body.image, body.code, body.stock)

    response.send({
        message: "Metodo PUT OK",
        data: data,
        status: 201
    })
})



    export default router;
