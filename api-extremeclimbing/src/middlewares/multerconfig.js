const multer = require('multer');

// no se necesita instalar path por separado ya que es un módulo del núcleo de Node.js y está disponible de forma predeterminada:

const path = require('path');

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    let rutaBase = 'views/imagenes/';
    
    // Subcategorías están presentes en el formulario
    let rutaCompleta = path.join(rutaBase, req.body.categoria);

    if (req.body.subcategoria1) {
      rutaCompleta = path.join(rutaCompleta, req.body.subcategoria1);

      if (req.body.subcategoria2) {
        rutaCompleta = path.join(rutaCompleta, req.body.subcategoria2);

        // Agrega más niveles si es necesario
        if (req.body.subcategoria3) {
          rutaCompleta = path.join(rutaCompleta, req.body.subcategoria3);
        }
      }
    }

    cb(null, rutaCompleta); // Define la carpeta de destino para almacenar los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define el nombre del archivo
  },
});

const cargarImg = multer({ storage: almacenamiento });

module.exports = cargarImg;
