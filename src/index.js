// Definiciones
import express from 'express'; // ES Modules
import productRouter from './routers/products.router.js';
import cartRouter from "./routers/cart.router.js";
import handlebars from 'express-handlebars';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));   // se usa para datos de formulario

// Carpeta publica - Estaticos
app.use(express.static('public'));

// Motor de Plantillas Handlebars - Configuracion inicial (dinamica)
app.engine('handlebars',handlebars.engine())
app.set('views','views')
app.set('view engine','handlebars')



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