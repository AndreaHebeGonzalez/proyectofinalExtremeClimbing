const multer = require('multer');

const path = require('path');

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    let rutaBase = 'views/imagenes/';
    
    let rutaCompleta = path.join(rutaBase, req.body.categoria);

    if (req.body.subcategoria1) {
      rutaCompleta = path.join(rutaCompleta, req.body.subcategoria1);

      if (req.body.subcategoria2) {
        rutaCompleta = path.join(rutaCompleta, req.body.subcategoria2);

        if (req.body.subcategoria3) {
          rutaCompleta = path.join(rutaCompleta, req.body.subcategoria3);
        }
      }
    }

    cb(null, rutaCompleta); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const cargarImg = multer({ storage: almacenamiento });

module.exports = cargarImg;
