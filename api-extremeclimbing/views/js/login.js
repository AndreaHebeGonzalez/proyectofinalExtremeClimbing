
//Los script se ejecutarán despues de la carga del documento html

document.addEventListener('DOMContentLoaded', () => {

    /* Validaciones del input de formulario login ------------------->>*/

//===================================================================================================
    /*1era Validación: consiste en verificar que el botón de enviar se muestre desactivado mientras los input están vacíos y se emitan mensajes de error.

    //Traigo los nodos requeridos para la primera validacion*/
    const formLogin = document.querySelector('#login-form');
    const botonLogin = document.querySelector('#login-btn');

    //Traigo nodos para mensajes de error
    

    //Deshabilito inicialmente el botón de login
    botonLogin.disabled = true;

    //Se crea una constante para guardar los ingresos de los input

    const valoresForm = {
        email: "",
        contraseña: ""
    }

    //Funcion para deshabilitar el boton login si los campos están vacíos:

    const bloquearBtnSubmit = () => {
        //Pregunto por el largo del valor de cada propiedad del objeto, que deben ser todas distintas de cero para habilitar el botón:

        if (valoresForm.email.length === 0) return false;
        if (valoresForm.contraseña.length === 0) return false;
        return true;
    }

    //Funcion para emitir error cuando los campos están vacíos y se sale del foco de los campos del formulario, el boton sigue deshabilitado:


    const errorCamposVacios = (value, name) => {
        const campoError = document.getElementById(name + '-error');
        if (value === '') {
            campoError.innerHTML = "Este campo es obligatorio"; 
        } else {
            campoError.innerHTML = '';
        };
    }

    // Agrego escuchador de evento al formulario para almacenar en las propiedades del objeto valoresForm los ingresos realizados en el input:
   
    formLogin.addEventListener('input', (e) => {
        // destructuring para extrar las propiedades value y name del objeto input, e.target es el objeto del cual estamos extrayendo esas propiedades... e.target se refiere al elemento en el que ocurrió el evento.
        const { value, name } = e.target;
        console.log(value, name);
        //sintaxis para agregar valor a objeto:
        valoresForm[name] = value.trim();
        console.log(valoresForm.email, valoresForm.contraseña);

        //deshabilito el botón con true, si alguna de las entradas está vacía devuelve false y lo invierto con un not
        console.log(!bloquearBtnLogin());
        botonLogin.disabled = !bloquearBtnSubmit();
        
        //Errores de campos vacios
        errorCamposVacios(value, name);

    });

//===================================================================================================
    /*2da Validación: */
    //Validacion de campos introducidos antes del evento submit:
    //Funcion validacion de email:


    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('formulario enviado:');
        console.log(valoresForm);
    })

});

