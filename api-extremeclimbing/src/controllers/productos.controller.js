//Controladres:
/*Gestiona la lógica de la aplicación y actúa como intermediario entre el modelo y la vista.
Responde a las solicitudes del usuario, realiza operaciones en el modelo y actualiza la vista.
*/
const { Productos, Imagenes } = require('../models/index');

const bd = require('../config/bd');

//Importo el modulo path para usar el método path.join(): 
const path = require('path');

//importo modulo fs en su version promisificada para trabajar con promesas los proceso de eliminado de archivos del sistema de archivos
const fs = require('fs').promises;

//Creo controlador para buscar todos los productos 
// async va delante de la funcion que contendrá codigo asíncrono
const buscarTodos = async (req, res) => {
    try {
        const productosConImagenes = await Productos.findAll({
            include: [{ model: Imagenes, attributes: ['url'] }],
        }); //contiene la promesa si resuelve el resultado se almacena en productos
    //Envio los productos en el cuerpo de la respuesta, utilizo el metodo .json para enviarlo en este formato ya que los resultados de las consultas se devuelven en formato tipo objeto
    //El siguiente mapeo manual se realiza para seleccionar y estructurar los campos exactos que se desean enviar al cliente
    const productosFormateados = productosConImagenes.map(producto => {
        return {
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precio,
            cantidad: producto.cantidad,
            categoria: producto.categoria,
            subcategoriaUno: producto.subcategoriaUno,
            subcategoriaDos: producto.subcategoriaDos,
            subcategoriaTres: producto.subcategoriaTres,
            descripcion: producto.descripcion,
            caracteristicas: producto.caracteristicas,
            infoTecnica: producto.infoTecnica,
            ventas: producto.ventas,
            oferta: producto.oferta,
            imagenes: producto.Imagenes.map(imagen => imagen.url),
        };
    });
    res.json(productosFormateados);
    //.json() se utiliza para extraer el cuerpo de una respuesta HTTP que está en formato JSON y convertirlo en un objeto de Python.
    } catch (error) { //Si la promesa fue rechazada hubo un error y se ingresa en este bloque para imprimirlo y generar el estado de la consulta
        console.error('Se produjo un error en la busqueda de los productos', error);
        return res.status(500).json({msg:'Error interno del servidor'});
    };
};

//Creo controlador para agregar un producto (tengo que verificar que el producto no exista en la base de datos
const agregar = async (req, res) => {
    //Obtengo los campos de la solicitud con sintaxis de desestructuracion
    const { nombre, marca, precio, cantidad, categoria, subcategoriaUno, subcategoriaDos, subcategoriaTres, descripcion, caracteristicas, infoTecnica } = req.body;
    //Creo una transaccion
    let transaction;
    try {

        transaction = await bd.transaction();

        const nuevoProducto = await Productos.create({
            nombre, 
            marca, 
            precio, 
            cantidad, 
            categoria,
            subcategoriaUno,
            subcategoriaDos,
            subcategoriaTres,
            descripcion, 
            caracteristicas, 
            infoTecnica,
        }, 
            { transaction }
        );
        
        //Obtengo las url donde se subieron las imagenes cargadas por el administrador en el formulario:
        
        const urlsImagenes = req.files.map(file => file.path); //file.path es de multer: file.path es específico de multer y representa la ubicación temporal del archivo en el servidor antes de ser movido o procesado de alguna manera. Se congfigura en multerconfig.js Después de este paso, se puede decidir qué hacer con el archivo.
        
        await Promise.all(urlsImagenes.map(async (url) => {

            url= url.replace('views', '');
            await Imagenes.create({
                url, 
                productoId: nuevoProducto.id,
            }, 
                { transaction });
        }));
        await transaction.commit();
    //Enviamos una respuesta al cliente en formato de objeto:
        return res.status(201).json({
            msg: 'Producto agregado exitosamente',
            nuevoProducto,
        });
    } catch (error) {
        console.error('Hubo un error no pudo crearse el producto', error);
        if (transaction) {
            await transaction.rollback(); // Si transaction está definida, ejecuta rollback
        }
        //Error interno del servidor
        return res.status(500).json('Error interno del servidor', error);
    };
};


//Creo controlador para buscar un producto por su id
const buscarPorId = async (req, res) => {
    //obtengo el id de la consulta que se guarda como parámetro de ruta en req.params, lo convierto a tipo number, se almacena en la bd como tipo entero
    const id = Number(req.params.id);
      console.log('Valor de ID:', id); // log para verificar el valor de id
    try {
        const producto = await Productos.findByPk(id, {
            include: [{ model: Imagenes, attributes: ['url'] }]
        });
        if(producto) {
            const productoFormateado = {
                id: producto.id,
                nombre: producto.nombre,
                marca: producto.marca,
                precio: producto.precio,
                cantidad: producto.cantidad,
                categoria: producto.categoria,
                subcategoriaUno: producto.subcategoriaUno,
                subcategoriaDos: producto.subcategoriaDos,
                subcategoriaTres: producto.subcategoriaTres,
                descripcion: producto.descripcion,
                caracteristicas: producto.caracteristicas,
                infoTecnica: producto.infoTecnica,
                imagenes: producto.Imagenes.map(imagen => imagen.url), //Agrego el campo url de imagenes de ese producto
            };
            return res.json(productoFormateado);
        } else {
            return res.status(404).json({msg: 'recurso no encontrado'});
        }
    } catch(error) {
        console.error(`Hubo un error al buscar el producto con id: ${id}`, error);
        return res.status(500).json({msg: 'Error interno del servidor', error});
    }
};

/*
Tratamiento de los errores: 

En el bloque de código que proporcionaste, existen dos posibles respuestas de error distintas:

Error 404 - Recurso no encontrado:

Si la búsqueda del producto por el ID no devuelve ningún resultado (producto es null), el controlador responde con un estado HTTP 404 y un mensaje indicando que el recurso no fue encontrado.


!return res.status(404).json({msg: 'recurso no encontrado'});
!Error 500 - Error interno del servidor:

Si ocurre un error durante la búsqueda del producto (por ejemplo, un error de base de datos), el controlador captura la excepción, imprime un mensaje de error en la consola y responde con un estado HTTP 500 y un mensaje indicando que hubo un error interno del servidor.

!return res.status(500).json({msg: 'Error interno del servidor'});
!El objetivo es proporcionar respuestas significativas y adecuadas a diferentes escenarios:

Si el producto no se encuentra, un estado 404 indica que el recurso solicitado no está presente.
Si hay un error interno del servidor, un estado 500 indica un problema que impide que se complete la solicitud correctamente.
Ambas respuestas son correctas en sus respectivos contextos. La elección entre 404 y 500 depende de la naturaleza del error y del comportamiento deseado en tu aplicación. En general, es una buena práctica proporcionar respuestas HTTP específicas y significativas según la situación.
*/

//Creo controlador para actualizar un producto referenciado por id y la gestion de imagenes para la actualizacion de este campo para un producto se hace en una ruta aparte: /imagenes e incluye la posibilidad de agregar nuevas imagenes o de borrar imagenes existentes
const actualizar = async (req, res) => {
    const id = Number(req.params.id);
    const { nombre, marca, precio, cantidad, categoria, subcategoriaUno, subcategoriaDos, subcategoriaTres, descripcion, caracteristicas, infoTecnica  } = req.body;
    try {
        //Primero busco el producto por su id, y si lo encuentra lo actualizo
        const producto = await Productos.findByPk(id);
        if(producto) {
            const productoActualizado = await producto.update({
                nombre: nombre || producto.nombre, 
                marca: marca || producto.marca, 
                precio: precio || producto.precio, 
                cantidad:  Number(cantidad) > 0 ? Number(cantidad) + Number(producto.cantidad) : producto.cantidad,
                categoria: categoria || producto.categoria,
                subcategoriaUno: subcategoriaUno || producto.subcategoriaUno,
                subcategoriaDos: subcategoriaDos || producto.subcategoriaDos,
                subcategoriaTres: subcategoriaTres || producto.subcategoriaTres,
                descripcion: descripcion || producto.descripcion, 
                caracteristicas: caracteristicas || producto.caracteristicas, 
                infoTecnica: infoTecnica || producto.infoTecnica,
            }, {
                where: { id: id } //! REVISAR SI ES NECESARIO ESPECIFICAR EL ID
            });
            return res.status(200).json({
                msg: 'El producto se actualizó correctamente',
                productoActualizado,
            });
        } else {
            return res.status(404).json({msg: 'Producto no encontrado'});
        };
    } catch(error) {
        console.error(`Hubo un error al actualizar el producto con id: ${id}`, error);
        return res.status(500).json('Error interno del servidor');
    }
};

//Creo controlador para borrar un producto 
//!Agregar el borrado de las imagenes del producto con este id
const borrarProducto = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const producto = await Productos.findByPk(id, { //producto contiene un objeto con todos los campos de la tabla 'productos' y tambien incluye un objeto 'Imagenes' con todos los campos de la tabla 'imagenes' que contienen el id de producto pasado
            include: Imagenes // Incluye las imágenes asociadas al producto_id por la relacion de uno a muchos declarada
        });
        console.log(producto.Imagenes);
        if(producto) {
            //consigo las  imagenes que contienen el producto id en el primer bloque, en el siguiente bloque mapeo el objeto producto.Imagenes y formo la ruta url con el metodo path.join, luego con el modulo fs de node elimino esos archivos ubicados en esa ruta.
            /* const imagenesABorrar = producto.Imagenes.map(imagen => path.join(__dirname, '../..', imagen.url)); */
            //__dirname indica la posicion del scrip, de ahi se sube dos veces y se entra en la url que contiene imagen.url --> !verificar
            /* await Promise.all(imagenesABorrar.map(urlImagenes => fs.unlink(urlImagenes))); */
            productoBorrado = await producto.destroy({
                include: Imagenes // Incluye las imágenes asociadas al producto_id
            });
            return res.json({msg: 'producto eliminado con exito'});
        } else {
            return res.status(404).json({msg: 'recurso no encontrado'});
        };
    } catch(error) {
        console.error(`Hubo un error al eliminar el producto con ID ${id}:`, error);
        return res.status(500).json({msg: 'Error interno del servidor'});
    };
};


const buscarPorCategoria = async (req, res) => {
    const categoria = req.params.categoria;
    console.log(categoria);
    try {
        const productos = await Productos.findAll({
            where: {
                categoria: categoria,
            },
            include: [{
            model: Imagenes,
            attributes: ['url'],
            }],
        });
        if(!productos) {
            res.status(404).json({msg:"recursos no encontrados"});
        };

        const productosFormateador = productos.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precio,
            cantidad: producto.cantidad,
            categoria: producto.categoria,
            subcategoriaUno: producto.subcategoriaUno,
            subcategoriaDos: producto.subcategoriaDos,
            subcategoriaTres: producto.subcategoriaTres,
            descripcion: producto.descripcion,
            caracteristicas: producto.caracteristicas,
            infoTecnica: producto.infoTecnica,
            imagenes: producto.Imagenes.map(imagen => imagen.url), //Agrego el campo url de imagenes de ese producto
        }))
        
        res.json(productosFormateador);
    } catch (error) {
        console.error('Hubo un error al buscar los productos por categoria', error);
        res.status(500).json({ msg: 'Hubo un error al buscar los productos por categoria', error });
    }
}

const busquedaAleatoria = async (req, res) => {
    const categoria = req.params.categoria;
    try {
        const productos = await Productos.findAll({
            where: {
                categoria: categoria
            },
            order: bd.random(), 
            limit: 10, 
            include: [{
                model: Imagenes,
                attributes: ['url']
            }]
        });
        if(!productos) {
            res.status(404).json({ msg: 'recursos no encontrados' })
        }
        const productosFormateador = productos.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precio,
            cantidad: producto.cantidad,
            categoria: producto.categoria,
            subcategoriaUno: producto.subcategoriaUno,
            subcategoriaDos: producto.subcategoriaDos,
            subcategoriaTres: producto.subcategoriaTres,
            descripcion: producto.descripcion,
            caracteristicas: producto.caracteristicas,
            infoTecnica: producto.infoTecnica,
            imagenes: producto.Imagenes.map(imagen => imagen.url), //Agrego el campo url de imagenes de ese producto
        }))
        res.json(productosFormateador);

    } catch (error) {
        console.error('Hubo un error al buscar productos por categoria', error);
        res.status(500).json({ msg: 'Error al buscar productos por categoria', error });
    }
}

//devolver categorias provisorio:

const categories = (req, res) => {
    const categorias = ['camping', 'montañismo', 'escalada'];
    res.json(categorias);
}

module.exports = {
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrarProducto,
    buscarPorCategoria,
    busquedaAleatoria,
    categories,
}


//Para crear un producto cargando los datos correspondientes en la tabla 'productos' y al mismo tiempo cargar las url de las imaganes de ese mismo producto en la tabla 'imagenes', se utiliza una funcionalidad de sequelice, las transacciones:
/*
TRANSACCIONES:
funcionalidad de transacciones en Sequelize, un ORM (Object-Relational Mapping)

Una transacción es una secuencia de una o más operaciones de base de datos que se deben ejecutar como una unidad atómica. Esto significa que todas las operaciones en la transacción se realizan con éxito o se deshacen en caso de error, garantizando la consistencia de la base de datos.

{ transaction } se utiliza para indicar a Sequelize que debe realizar las operaciones dentro de la transacción proporcionada. 

1-Inicio de la transacción:
Se inicia una nueva transacción utilizando el método transaction del objeto bd (instancia de Sequelize). Este método devuelve una instancia de transacción que se almacena en la variable transaction.

const transaction = await bd.transaction();

2- Operaciones dentro de la transaccion:
La creación de un nuevo producto (Productos.create()) se realiza dentro de la transacción. La opción { transaction } se pasa como un objeto de opciones, indicando que esta operación debe formar parte de la transacción.

const nuevoProducto = await Productos.create({
    // Propiedades del producto
}

Lo mismo ocurre para la creación de imágenes asociadas al producto. Todas estas operaciones (creación de producto y creación de imágenes) deben realizarse como una unidad atómica.

await Imagenes.create({
    // Propiedades de la imagen
}, { transaction });

3-Confirmación o reversión de la transacción:
Si todas las operaciones dentro de la transacción se completan con éxito, se utiliza transaction.commit() para confirmar la transacción. Si ocurre algún error, puedes utilizar transaction.rollback() para deshacer todas las operaciones realizadas dentro de la transacción.

await transaction.commit(); // Confirma la transacción

*/

/*
Promise.all:
es una construcción que toma un array de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en el array se han resuelto o alguna de ellas es rechazada. Es especialmente útil cuando tienes un array de operaciones asíncronas que quieres ejecutar en paralelo.

Espera de todas las promesas con await:
Al utilizar await con Promise.all se busca esperar a que todas las operaciones asíncronas dentro del array se completen antes de continuar con la ejecución del código.

await Promise.all(..)

Ejemplo:

await Promise.all(urlImagenes.map(async (url) => {
    await Imagenes.create({
        url,
        producto_id: nuevoProducto.id,
    });
}));

En: 
urlImagenes.map(async (url) => {
    // ...
})

Se itera sobre cada elemento del array de urls y devuelve un nuevo array con los resultados de aplicar una función a cada elemento. En este caso, se aplica una función asíncrona a cada URL en urlImagenes.

Se utiliza Imagenes.create para crear una nueva instancia en la tabla Imagenes. Cada llamada a Imagenes.create crea una nueva imagen asociada al producto recién creado (nuevoProducto.id) con la URL proporcionada.

*/


/*
//! Path y fs
path y fs son dos módulos fundamentales que proporcionan funcionalidades para trabajar con rutas de archivos y realizar operaciones en el sistema de archivos, respectivamente.
HACER APUNTES SOBRE ESTOS DOS MODULOS
*/
