const { Productos, Imagenes } = require('../models/index');
const { path } = require('path');


//Controlador para agregar imagenes a un producto ya existente:
//SUbir archivos por separado para este producto
const agregar = async (req, res) => { //Se debe enviar desde el front al back un objeto con producto_id categoria, subcategoriaUno, subcategoriaDos, subcategoriaTres si tiene el producto y un array de urlsImagenes
    const { productoId } = req.body;
    try {
        const urlsImagenes = req.files.map(file => file.path);
        //Verifico si el producto existe antes de crear una imagen 
        const producto = await Productos.findByPk(productoId);
            if (producto) {
                await Promise.all(urlsImagenes.map(async (url) => {
                    await Imagenes.create({
                        url,
                        producto_id: productoId
                    });
                })); 
                res.json('imagen agregada correctamente');
            } else {
            return res.status(404).json({msg: 'El producto no existe'});
            };
    } catch (error) {
        console.error('Hubo un error, no pudo agregarse las imagenes:', error);
        return res.status(500).json({ msg: 'No pudieron agregarse las imagenes', error });
    };
};

//Controlador para borrar una imagen segun el id pasado como parámetro
const borrarPorIdImagen = async (req, res) => {
    const { idImagen } = Number(req.params);
    try {
        const imagen = await Imagenes.findByPk(idImagen); 
        if (imagen) {
            //borrado de imagen en tabla
            await Imagenes.destroy( { where: { idImagen } });

            //borrado de imagen en sistema de archivos
            const imagenABorrar = path.join(__dirname, '../..', imagen.url);
            await fs.promises.unlink(imagenABorrar);
            //Envio de respuesta
            res.json({msg: 'Imagen borrada con exito'});
        } else {
            return res.status(404).json({msg: 'La imagen que intenta borrar no existe'});
        };
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({msg: 'Error al eliminar imagenes por ID de imagen', error});
    }
};

const buscarPorIdProducto = async (req, res) => { //Lo requiero para renderizar las imagenes de un producto especifico en la pagina del administrador, a estas imagenes se les agrega un boton de borrado si el administrador desea borrar alguna
    const { idProducto } = Number(req.params);

    try {
        const imagenes = await Imagenes.finAll({ where: {
            producto_id: idProducto
        } });
        res.status(200).json( { imagenes });
    } catch (error) {
        console.error('Error al buscar imagenes por ID de producto:', error);
        res.status(500).json({msg: 'Error al buscar imagenes por ID de producto', error});
    }
}


module.exports = {
    agregar,
    borrarPorIdImagen,
    buscarPorIdProducto,
}