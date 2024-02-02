//Archivos entry point:

//Importo express
const express = require('express');
const cors = require('cors');

//Importo enrutadores creados en la carpeta routes para su montaje, con los enrutadores se definen las rutas (endpoints) para el manejo de las solicitudes HTTP y su conexión con los cotroladores específicos.
const productosRouter = require('./routes/productos.routes');

const imagenesRouter = require('./routes/imagenes.routes');

const usuariosRouter = require('./routes/usuarios.routes');

const ordenDeCompraRouter = require('./routes/ordenDeCompra.routes');

//Definicion del puerto para el servidor
const PUERTO = 8000;

//Importo la instancia de la base de datos para establecer conexión desde el entrypoint

const bd = require('./config/bd');

//Importo modelos para su sincronización
const { Productos, Usuarios, Imagenes, Favoritos, OrdenDeCompra, DetalleOrden } = require('./models/index');

//Importo middleware configurado express-session y express-session para su uso:
const sesionConfig = require('./middlewares/sessionConfig');
const sesion = require('express-session');



//Importo middleware multer para cargar las imagenes en el servidor:
const cargarImg = require('./middlewares/multerconfig');

//Middleware personalizado:
const middlewareDePrueba = (req, res, next) => {
    console.log("Llego una petición", req.body);
    next();
  };

//Se intancia la aplicación express en app:
const app = express();

//Configuracion de cors para recibir solis desde el dominio http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

/*
Montaje de middlewares:
Se usan los middlewares: express.json() para analizar el cuerpo de las solicitudes con formato JSON, y middlewareDePrueba definido anteriormente, multer para cargar las imagenes en el sistema de archivos del servidor, express-session para crear sesiones de usaurios en la api back...
*/

app.use(express.static('views'));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true })); // Este middleware se usa para  gestionar datos de formularios enviados mediante el método POST. El middleware express.urlencoded() analiza los datos del cuerpo de la solicitud POST y los convierte en un objeto JavaScript, que luego se puede utilizar en las rutas de tu aplicación. La opción extended en express.urlencoded({ extended: false }) se refiere a cómo se analizan los datos codificados en URL. Cuando extended es false, el middleware utiliza la biblioteca querystring de Node.js para analizar los datos, que admite solo datos simples y no objetos anidados. Si extended es true, el middleware utiliza la biblioteca qs para analizar los datos, lo que permite la serialización y análisis de objetos anidados, con limit: '20mb' se establece un tamaño maximo para los archivos enviados
app.use(middlewareDePrueba);

//Montaje del middleware express-session
app.use(sesion(sesionConfig));

/*Montaje de enrutador. Cualquier solicitud que coincida con estas rutas será manejada por este enrutador*/
app.use('/productos', cargarImg.array('imagenes', 15), productosRouter);
app.use('/imagenes', cargarImg.array('imagenes', 15), imagenesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes-de-compras', ordenDeCompraRouter);

//Este manejador de solicitudes GET a la ruta raíz ("/")
app.get("/", (req, res) => {
    res.send("Realizaste una solicitud GET a la ruta raiz");
});

/*
.authenticate() es un método de la instancia bd que se utiliza para verificar la conexión a la base de datos y devuelve una promesa que se resolverá si la conexión es exitosa y se rechazará si hay algún problema durante la conexión
*/

async function iniciarServidor() {
  try {
    // Sincroniza el modelo con la base de datos
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
    //agrego escuchador al servidor en el puerto especificado
    app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto: ${PUERTO} - http://localhost:${PUERTO}`));

  } catch(error) {
    console.error('Error al conectar a la base de datos:', error);
  };
}

iniciarServidor();





