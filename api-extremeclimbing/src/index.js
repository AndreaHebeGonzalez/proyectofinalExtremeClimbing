
const express = require('express');

const cors = require('cors');

const productosRouter = require('./routes/productos.routes');

const imagenesRouter = require('./routes/imagenes.routes');

const usuariosRouter = require('./routes/usuarios.routes');

const ordenDeCompraRouter = require('./routes/ordenDeCompra.routes');

const PUERTO = 8000;


const bd = require('./config/bd');

const { Productos, Usuarios, Imagenes, Favoritos, OrdenDeCompra, DetalleOrden } = require('./models/index');

const sesionConfig = require('./middlewares/sessionConfig');
const sesion = require('express-session');


const cargarImg = require('./middlewares/multerconfig');

const middlewareDePrueba = (req, res, next) => {
    console.log("Llego una petición", req.body);
    next();
  };

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.static('views'));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true })); 
app.use(middlewareDePrueba);

app.use(sesion(sesionConfig));

app.use('/productos', cargarImg.array('imagenes', 15), productosRouter);
app.use('/imagenes', cargarImg.array('imagenes', 15), imagenesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes-de-compras', ordenDeCompraRouter);


app.get("/", (req, res) => {
    res.send("Realizaste una solicitud GET a la ruta raiz");
});


async function iniciarServidor() {
  try {
    await Productos.sync();
    console.log('Modelo sincronizado correctamente');
    await Usuarios.sync();
    console.log('Modelo sincronizado correctamente');
    await Imagenes.sync();
    console.log('Modelo sincronizado correctamente');
    await Favoritos.sync();
    console.log('Modelo sincronizado correctamente');
    await OrdenDeCompra.sync();
    console.log('Modelo sincronizado correctamente');
    await DetalleOrden.sync();
    console.log('Modelo sincronizado correctamente');
    await bd.authenticate()
    console.log('Conexión con base de datos establecida correctamente');
    app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto: ${PUERTO} - http://localhost:${PUERTO}`));

  } catch(error) {
    console.error('Error al conectar a la base de datos:', error);
  };
}

iniciarServidor();





