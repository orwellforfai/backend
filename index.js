const express = require('express');

const app = express();

const ProductManager = require('./src/productos.js');

app.get('/', (request, response) => {
    response.send('<h1 style="color:goldenrod">Bienvenidos a la pagina de productos!!</h1>');
})

// app.get('/products', (request, response) => {
//     const productManager = new ProductManager()
//     productManager.getProducts()
//     response.send({
//         message: "success",
//         data: productManager.getProducts()
//     })
// })
// limito a 5 el listado de productos
app.get('/products', (request, response) => {
    const productManager = new ProductManager()
   //   productManager.getProducts()
      const limit = request.query.limit
    response.send({
        message: "Metodo Limite OK",
        data: productManager.getProducts().slice(0, limit)
    })
})


app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
})