const iconoHamburguesa = document.querySelector('#icono-hamburguesa');
const cerrar = document.querySelector('#cierre'); // icono cerrar de munú mobile
const contenedorLupa = document.querySelectorAll('.lupa'); // array de div con clase lupa (2)
const buscar = document.querySelectorAll('.buscar'); // array de input con clase buscar (2)
const menuPrincipal = document.querySelector('.contenedor-menu-principal'); 

//Submenú productos del menú mobile

const subMenuProductos = document.querySelector('#item-productos a');

const contenedorMenuCategorias = document.querySelector('.nav-contenedor-categorias');


//Submenú cliente del menú desktop

const subMenuCliente = document.querySelector('#cliente');

const contenedorMenuCliente = document.querySelector('.nav-contenedor-cliente');



//Escuchador de eventos ---------------------->

/* La siguiente funcion aparece el menu mobile y desaparece el icono de hamburguesa */

iconoHamburguesa.addEventListener('click', () => {
    menuPrincipal.classList.add("visible");
    iconoHamburguesa.style.opacity= '0';
}); 

/* El siguiente script desaparece el menu mobile y aparece el icono de hamburguesa */
cerrar.addEventListener('click', () => {
    menuPrincipal.classList.remove("visible");
    iconoHamburguesa.style.opacity= '1';
});


/* El siguiente script desaparece y aparece el ícono de la lupa del menú principal*/

//Ancho de la pantalla del dispositivo

const anchoDePantalla = window.innerWidth; //! No utilizado todavía

/* Efectos sobre buscador de productos */

//Buscador de productos menu mobile:

contenedorLupa[0].addEventListener('click', () => {
    buscar[0].classList.toggle('input-extendido');
} )

//Buscador de productos menu desktop:

let buscadorActivado = false;

contenedorLupa[1].addEventListener('click', () => {
    if (buscadorActivado === false) {
        buscadorActivado = true;
        console.log(contenedorLupa[1])
        console.log(menuPrincipal);
        menuPrincipal.classList.add('menu-oculto');
        setTimeout (() => {
            buscar[1].classList.add('estado');
            setTimeout (() => {
                buscar[1].classList.add('input-extendido-dos');
            }, 160)
        }, 160);
    } else if (buscadorActivado === true) {
        buscadorActivado = false;
        buscar[1].classList.remove('input-extendido-dos');
        setTimeout (() => {
            buscar[1].classList.remove('estado');
            setTimeout (() => {
                menuPrincipal.classList.remove('menu-oculto');
            }, 200)
        }, 200);
    }
});

//Aparece el submenú desplegable de productos en menú mobile

subMenuProductos.addEventListener('click', () => {
    contenedorMenuCategorias.classList.toggle('mostrar-categorias');
})

//Aparece el submenú desplegable de cliente en menú desktop

subMenuCliente.addEventListener('mouseover', () => {
    contenedorMenuCliente.classList.add('mostrar-submenu-cliente');
})

subMenuCliente.addEventListener('mouseout', () => {
    contenedorMenuCliente.classList.remove('mostrar-submenu-cliente');
})







