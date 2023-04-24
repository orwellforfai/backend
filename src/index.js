// Definiciones
import express from 'express'; // ES Modules
import productRouter from './routers/products.router.js';
import cartRouter from "./routers/cart.router.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));   // se usa para datos de formulario
app.use(express.static('public'));

// Middleware
app.use((req, res, next) =>{
    console.log("Usuario loguedo")
    next()
})

// Rutas
app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

// Inicio el servidor
app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
})