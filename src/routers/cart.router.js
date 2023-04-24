import {Router}  from "express";

let cart = []

const router = Router();

router.get('/', (request, response) => {
    response.send({ cart });
})

router.post('/', (request, response) => {
 const product = request.body
    console.log(product)
    cart.push(product)
    response.send({
        message: "Metodo POST OK",
        data: cart
    })
})

export default router;