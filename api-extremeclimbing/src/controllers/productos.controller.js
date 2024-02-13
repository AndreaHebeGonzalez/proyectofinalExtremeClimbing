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
        
        const urlsImagenes = req.files.map(file => file.path);
        
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
    
    const id = Number(req.params.id);

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

