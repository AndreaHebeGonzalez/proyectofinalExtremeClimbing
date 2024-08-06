
const { Productos, Imagenes } = require('../models/index');

const bd = require('../config/bd');


const path = require('path');

const fs = require('fs').promises;


const buscarTodos = async (req, res) => {
    try {
        const productosConImagenes = await Productos.findAll({
            include: [{ model: Imagenes, attributes: ['url'] }],
        }); 
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
    
    } catch (error) { 
        console.error('Se produjo un error en la busqueda de los productos', error);
        return res.status(500).json({msg:'Error interno del servidor'});
    };
};

const agregar = async (req, res) => {
    
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
    
        return res.status(201).json({
            msg: 'Producto agregado exitosamente',
            nuevoProducto,
        });
    } catch (error) {
        console.error('Hubo un error no pudo crearse el producto', error);
        if (transaction) {
            await transaction.rollback();
        }
        return res.status(500).json('Error interno del servidor', error);
    };
};



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
        const producto = await Productos.findByPk(id, { 
            include: Imagenes 
        });
        console.log(producto.Imagenes);
        if(producto) {
            
            productoBorrado = await producto.destroy({
                include: Imagenes 
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
            imagenes: producto.Imagenes.map(imagen => imagen.url),
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
            imagenes: producto.Imagenes.map(imagen => imagen.url), 
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

