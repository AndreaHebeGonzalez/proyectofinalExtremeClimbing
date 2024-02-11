import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BtnAdmin from '../Botones/BtnAdmin';
import './Navbar.css';
import { useAbrirCarrito } from '../../EstadosGlobales.jsx/useAbrirCarrito'
import { useCarrito } from '../../EstadosGlobales.jsx/useCarrito';
import { useAuth } from '../../EstadosGlobales.jsx/useAuth';


const Navbar = () => {
    const [abrirMenu, setAbrirMenu] = useState(true);

    const [abrirInputMobile, setAbrirInputMobile] = useState(false);

    const [abrirInput, setAbrirInput] = useState(false);

    const [agregoEstado, setAgregoEstado] = useState(false);

    const [extenderInput, setExtenderInput] = useState(false);

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const [mostrarCategorias, setMostrarCategorias] = useState(false);

    const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

    const abrirCarrito = useAbrirCarrito((state) => state.abrirCarrito);

    const productosCarrito = useCarrito((state) => state.productosCarrito);

    //datos de sesion
    const user = useAuth((state) => state.user);
    const isLogin = useAuth((state) => state.isLogin);

    //Iniciales de usuario:



    const handleAbrirMenu = () => {
        setAbrirMenu(!abrirMenu);
    };

    const handleAbrirInputMobile = () => {
        setAbrirInputMobile(!abrirInputMobile);
    };
    
    const handleAbrirInput = () => {
        setAbrirInput(!abrirInput); 
        if (abrirInput === false) { //No responde al cambio de estado inmediatamente, a pesar de que con el click el estado cambia a true, la lectura es el estado previo. 
            setOcultarMenu(true);
            setTimeout(() => {
                setAgregoEstado(true);
                setTimeout(() => {
                    setExtenderInput(true);
                }, 160);
            }, 160);
        } else {
            setExtenderInput(false);
            setTimeout(() => {
                setAgregoEstado(false);
                setTimeout(() => {
                    setOcultarMenu(false);
                }, 200);
            }, 200);
        }
    };

    const handleMostrarCategorias = () => {
        setMostrarCategorias(!mostrarCategorias);
    };

    const handleMouseOver = () => {
        setMostrarSubmenu(true);
    };

    const handleMouseOut = () => {
        setMostrarSubmenu(false);
    };


    return (
        <>
            <section className="contenedor-menu-general">

                <div id="icono-hamburguesa" onClick= {handleAbrirMenu} className = {abrirMenu ? "ver" : "no-ver"}>
                
                    <img className="iconos-respons" src="../../public/imagenes/iconos/menuhamburguesa.png" alt="Menu de navegacion"/>
                </div>

                <div className="logo">
                    <img src="../../public/imagenes/logo2.png" alt="Logo de Extreme Climbing"/>
                </div>

                {/* <!-- EMPIEZA menu de navegacion --> */}


                <div className= {`contenedor-menu-principal ${abrirMenu ? "" : "visible"} ${ocultarMenu ? "menu-oculto" : ""}`}>
                    <div id= "header-menu-mobile">
                        {/* <!-- Busqueda de productos --> */}

                        <input type="text" placeholder="buscar" className={`buscar ${abrirInputMobile ? "input-extendido" : ""}`}/> 

                        <div className="lupa" onClick= {handleAbrirInputMobile}>
                            <img className="iconos-respons" src="../../public/imagenes/iconos/buscar.png" alt="Buscar articulo"/>
                        </div>

                        {/* <!-- FIN Busqueda de productos --> */}

                        {/* <!--Icono de cierre de menú mobile --> */}
                        <div id="cierre" onClick={handleAbrirMenu}>
                            <img className="icono2" src="../../public/imagenes/iconos/cierre.png" alt= "Cruz para cerrar el menú"/>
                        </div>
                        {/* <!--Fin icono de cierre de menú mobile --> */}
                    </div>

                    {/* <!--items menú mobile - desktop --> */}

                    <nav className="nav-principal">
                        <ul>
                            <li className="item-nav">
                                <Link to="/" className="link-nav">Inicio</Link>
                            </li>

                            <li className="item-nav estado">
                                <Link to="/productos" className="link-nav">Productos</Link>
                            </li>

                            <li id="item-productos"><Link to="/productos" onClick= {handleMostrarCategorias}>Productos</Link> {/* <!-- Visible en version mobile --> */}
                                <div className= {`nav-contenedor-categorias ${mostrarCategorias ? "mostrar-categorias" : ""}`}>
                                    <ul className="nav-categorias">
                                        <li className="item-categoria">
                                            <Link to="/" className="link-nav">Escalada</Link>
                                        </li>
                                        <li className="item-categoria">
                                            <Link to="/" className="link-nav">Camping</Link>
                                        </li>
                                        <li className="item-categoria">
                                            <Link to="/" className="link-nav">Trekking</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="item-nav">
                                <Link to="/contacto" className="link-nav">Contacto</Link>
                            </li>

                            <li className="item-nav" id="cliente" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> {/* <!-- No aparece en version mobile --> */}
                                <Link to="#" className="link-nav">Cliente</Link>

                                <div className= {`nav-contenedor-cliente ${mostrarSubmenu ? "mostrar-submenu-cliente" : ""}`}>

                                    {isLogin === false && <ul className="nav-cliente">
                                        <li>
                                            <Link to="/login" className="link-nav" style={{ fontSize: '16px' }}>Ingresá</Link>
                                        </li>
                                        <li>
                                            <Link to="/registro" className="link-nav" style={{ fontSize: '16px' }}>Registrate</Link>
                                        </li>
                                    </ul>}

                                {isLogin && <ul className="nav-cliente">
                                        <div className='user-login'>
                                            <div className='avatar-user'><span>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</span></div>
                                            <h3>{`${user.nombre} ${user.apellido}`}</h3>
                                        </div>
                                        <li>
                                            <Link to="/mi-cuenta" style={{ fontSize: '16px' }}>Mi cuenta</Link>
                                        </li>
                                        <li style={{ fontSize: '16px' }}>  {/* Cerrar sesion implica solicitud fetch y vaciamiento de local storage y del estado global user */}
                                            Cerrar sesión
                                        </li>
                                    </ul>}

                                </div>
                            </li>

                            {user && user.rol === "admin" && <li>
                            <Link to="/administracion">
                                <BtnAdmin operacion= "Admin" />
                            </Link>
                            </li>}



                        </ul>
                    </nav>

                    <div className="login-register-contenedor"> {/* <!-- Aparece en version mobile --> */}
                        <div>
                            <img className="icono" src="../../public/imagenes/iconos/usuario.png" alt="Botón Login"/>
                            <a href="#">Ingresá</a>
                        </div>

                        <div id="slash">
                            <img className="icono" src="../../public/imagenes/iconos/slash.png" alt="Botón Login"/>
                        </div>

                        <div id="registro">
                            <img className="icono" src="../../public/imagenes/iconos/registro.png" alt="Botón registro"/>
                            <a href="#">Registrate</a>
                        </div>
                    </div>

                    {/* <!--FIN items menú mobile - desktop--> */}
                </div>

                {/* <!-- TERMINA menu de navegacion --> */}

                {/* <!-- Busqueda de productos--> */}

                <input type="text" placeholder="buscar" className= {`buscar desaparece ${agregoEstado ? "estado" : ""} ${extenderInput ?"input-extendido-dos": ""}`}/> {/* <!-- Me interesa que el input no ocupe espacio a partir de 1200px --> */}
                <div id="lupa2" className="lupa estado" onClick= {handleAbrirInput}>
                    <img className="iconos-respons" src="../../public/imagenes/iconos/buscar.png" alt="Carrito de compras" style={{ maxWidth: "43px" }}/> {/* <!-- Este carrito se ubica a la derecha en version mobile y escritorio --> */}
                </div>

                {/* <!-- FIN Busqueda de productos --> */}
                
                <div id="carrito" onClick={() => {abrirCarrito()}}>
                    <img className="iconos-respons" src="../../public/imagenes/iconos/carrito.png" alt="Carrito de compras" style={{ maxWidth: "43px" }}/> {/* <!-- Este carrito se ubica a la derecha en version mobile y escritorio --> */}
                    <div className="cantidad-de-productos"><p>{productosCarrito ? `${productosCarrito.length}`: '0'}</p></div>
                </div>


                {/* <!-- Menu de categorias visible en version desktop --> */}

                <nav className="nav-categorias-desktop"> 
                    
                    <ul>
                        <img className="iconos-respons" src="../../public/imagenes/iconos/home-blanco.png" alt="inicio"/>

                        <li className="item-categoria">
                            <a href="#" className="link-nav">ESCALADA</a>
                        </li>
                        <li className="item-categoria">
                            <a href="#" className="link-nav">CAMPING</a>
                        </li>
                        <li className="item-categoria">
                            <a href="#" className="link-nav">TREKKING</a>
                        </li>
                    </ul>

                </nav>

                {/* <!-- FIN Menu de categorias visible en version desktop --> */}
            </section>
        </>
    )
}

export default Navbar