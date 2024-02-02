document.addEventListener('DOMContentLoaded', () => {
    
    const formData = {
        nombre:'',
        marca:'',
        precio:'',
        cantidad:'',
        categoria:'',
        subcategoriaUno: '',
        subcategoriaDos: '',
        subcategoriaTres: '',
        descripcion:'',
        caracteristicas: [],
        infoTecnica: [] 
    }

    //Funciones para item caracteristicas del form

    document.querySelector('#agregar-caracteristica').addEventListener('click', (e) => {
        e.preventDefault();
        const listaInput = document.querySelector('#lista-caracteristicas');
        const nuevoLiInput = document.createElement('li');
        const nuevoInput = document.createElement("input");
        nuevoInput.type = 'text';
        nuevoInput.name = 'caracteristicas';
        nuevoInput.placeholder = 'Ingrese caracteristica';
        nuevoLiInput.appendChild(nuevoInput);
        listaInput.appendChild(nuevoLiInput);
        document.querySelector('#quitar-caracteristica').disabled = false;
        document.querySelector('#agregar-caracteristica').disabled = (listaInput.childElementCount > 13);
    });

    document.querySelector('#quitar-caracteristica').addEventListener('click', (e) => {
        e.preventDefault();
        const listaInput = document.querySelector('#lista-caracteristicas');
        const ultimoInput = listaInput.lastChild;
        if (ultimoInput) {
            listaInput.removeChild(ultimoInput);
            document.querySelector('#quitar-caracteristica').disabled = (listaInput.childElementCount <= 0);
        };
        const inputCaracteristicas = document.getElementsByName('caracteristicas'); //Devuelve un Nodelist
        formData['caracteristicas'] = Array.from(inputCaracteristicas);
        console.log(formData.caracteristicas);
    });
    

    //Campos obligatorios, los traigo porque creo las funciones necesarias para validar cada campo:

    const prodNombre = document.querySelector('#prod-nombre');
    const prodMarca = document.querySelector('#prod-marca');
    const prodPrecio = document.querySelector('#prod-precio');
    const prodCantidad = document.querySelector('#prod-cantidad');
    const prodCategoria = document.querySelector('#prod-categoria');


   //Formulario:
    const adminFormProd = document.querySelector('#admin-form');


    function validarNombre() {
        const campoError = document.getElementById(`${prodNombre.name}-error`);
        if (prodNombre.value.trim() === '') {
            campoError.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campoError.textContent = '';
            return true;
        };
    };

    function validarMarca() {
        const campoError = document.getElementById(`${prodMarca.name}-error`);
        if (prodMarca.value.trim() === '') {
            campoError.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campoError.textContent = '';
            return true;
        };
    };

    function validarPrecio() {
        const campoError = document.getElementById(`${prodPrecio.name}-error`);
        if (prodPrecio.value.trim() === '') {
            campoError.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campoError.textContent = '';
            return true;
        };
    };

    function validarCantidad() {
        const campoError = document.getElementById(`${prodCantidad.name}-error`);
        if (prodCantidad.value.trim() === '') {
            campoError.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campoError.textContent = '';
            return true;
        };
    };

    function validarCategoria() {
        const campoError = document.getElementById(`${prodCategoria.name}-error`);
        if (prodCategoria.value.trim() === '') {
            campoError.textContent = 'Este campo es obligatorio';
            return false;
        } else {
            campoError.textContent = '';
            return true;
        };
    };

    //Funcion usada para mostrar error de campo vacio en pantalla:

    const errorDeCamposVacios = (name, value) => {
        if (name === 'nombre' || name === 'marca'|| name === 'precio' || name === 'cantidad' || name === 'categoria') {
            const campoError = document.getElementById(`${name}-error`);
            if (value.trim() === '') {
                campoError.textContent = 'Este campo es obligatorio';
            } else {
                campoError.textContent = '';
            };
        };
    }

    adminFormProd.addEventListener('input', (e) => {
        const { value, name } = e.target;
        if (name === 'caracteristicas') {
            const inputCaracteristicas = document.getElementsByName('caracteristicas'); //Devuelve un Nodelist
            console.log(inputCaracteristicas);
            formData[name] = Array.from(inputCaracteristicas).map(caracteristica => caracteristica.value.trim()).filter(caracteristica => caracteristica !== '');
            console.log(formData.caracteristicas);
        } else if (name === 'infoTecnica') {
            const inputCaracteristicas = document.getElementsByName('caracteristicas'); //Devuelve un Nodelist
            console.log(inputCaracteristicas);
            formData[name] = Array.from(inputCaracteristicas).map(caracteristica => caracteristica.value.trim());
            console.log(formData.caracteristicas);
        } else {
            formData[name] = value.trim();
            errorDeCamposVacios(name, value);
        }
    });


    adminFormProd.addEventListener('submit', async (e) => {
        e.preventDefault();
        validarNombre();
        validarMarca();
        validarPrecio();
        validarCantidad();
        validarCategoria();
        if (validarNombre() && validarMarca() && validarPrecio() && validarCantidad() && validarCategoria()) {
            const formDataConArchivos = new FormData(); //Instancia de FormData();
            
            // Agregar campos de texto al FormData
            Object.entries(formData).forEach(([key, value]) => { //Obect.entries: devuelve array de arrays de pares clave/valor del objeto que se pasa como argumento
                if (Array.isArray(value)) {
                    // Si es un array, itera y agrega cada elemento por separado
                    value.forEach((element, index) => {
                        formDataConArchivos.append(`${key}[${index}]`, element);
                    });
                } else {
                    formDataConArchivos.append(key, value);
                }
            });
            
            const inputImagenes = document.getElementById('imagenes'); 
            const archivos = inputImagenes.files;

            for (let i = 0; i < archivos.length; i++) {
                formDataConArchivos.append('imagenes', archivos[i]);
            }

            
            console.log('Se enviará el siguiente objeto en formato json:')
            for (const entry of formDataConArchivos.entries()) {
                console.log(entry[0], entry[1]);
            }
            
            try {
                const respuesta = await fetch ("http://localhost:8000/productos/", {
                    method: 'POST',
                    body: formDataConArchivos
                });
                const dataRespuesta = await respuesta.json();
                console.log(dataRespuesta);
            } catch (error) {
                ('Error:', error);
            };
        };
    });
});


/*


new FileReader():

FileReader es un objeto nativo de JavaScript que proporciona una interfaz para leer el contenido de archivos de manera asíncrona. Este objeto se encuentra en la especificación del DOM (Document Object Model) -FileReader es un objeto que está definido y especificado en el contexto del DOM. Esto implica que se puede utilizar en un entorno web para interactuar con archivos desde el lado del cliente.- y está diseñado para interactuar con objetos Blob y File, que representan datos binarios y archivos, respectivamente.

Para usar dicha herramienta se crea una nueva instancia de FileReader, que proporcionará los metodos para leer los archivos:

const lector = new FileReader();


FormData():



DOM: 
El DOM es una interfaz de programación que representa la estructura de documentos HTML y XML como una jerarquía de objetos. Estos objetos representan elementos, atributos, texto y otros componentes de un documento web.




*/