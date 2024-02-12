import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BtnAdmin from '../Botones/BtnAdmin';
import './Navbar.css';
import { useAbrirCarrito } from '../../EstadosGlobales/useAbrirCarrito'
import { useCarrito } from '../../EstadosGlobales/useCarrito';
import { useAuth } from '../../EstadosGlobales/useAuth';


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
    const logout = useAuth((state) => state.logout);

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

    const handleCerrarSesion = () => {
        logout();
        localStorage.removeItem('userData');
    };

    return (
        <>
            <section className="contenedor-menu-general">

                <div id="icono-hamburguesa" onClick= {handleAbrirMenu} className = {abrirMenu ? "ver" : "no-ver"}>
                
                    <img className="iconos-respons" src="../../public/imagenes/iconos/menuhamburguesa.png" alt="Menu de navegacion"/>
                </div>

                <div className="logo">
                    <img src="../../public/imagenes/logo3.png" alt="Logo de Extreme Climbing"/>
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
                                {/* <div className= {`nav-contenedor-categorias ${mostrarCategorias ? "mostrar-categorias" : ""}`}>
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
                                </div> */}
                            </li>

                            <li className="item-nav">
                                <Link to="/contacto" className="link-nav">Contacto</Link>
                            </li>
                            
                            {isLogin === false && <li className="item-nav" id="iniciar-sesion">
                                <Link to="/login" className="link-nav">Iniciar sesión</Link>
                            </li>}

                            {isLogin === false && <li className="item-nav" id="registrarse">
                                <Link to="/registro" className="link-nav registrarse">Registrarse</Link>
                            </li>}
                            

                            {user && isLogin === true && <li className="item-nav" id="cliente" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> {/* <!-- No aparece en version mobile --> */}
                                <Link to="#" className="link-nav">Cliente</Link>

                                <div className= {`nav-contenedor-cliente ${mostrarSubmenu ? "mostrar-submenu-cliente" : ""}`}>

                                    <ul className="nav-cliente">
                                        <div className='user-login'>
                                            <div className='avatar-user'><span>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</span></div>
                                            <span>{`${user.nombre} ${user.apellido}`}</span>
                                        </div>
                                        <li>
                                            <Link to="/mi-cuenta" style={{ fontSize: '16px' }}>Mi cuenta</Link>
                                        </li>
                                        <li className="cerrar-sesion" style={{ fontSize: '16px' }} onClick={handleCerrarSesion}>  {/* Cerrar sesion implica solicitud fetch y vaciamiento de local storage y del estado global user */}
                                            Cerrar sesión
                                        </li>
                                    </ul>

                                </div>
                            </li>}

                            {user && user.rol === "admin" && <li>
                            <Link to="/administracion">
                                <BtnAdmin operacion= "Admin" />
                            </Link>
                            </li>}



                        </ul>
                    </nav>

                    {/* <!-- Aparece en version mobile --> */}

                    {isLogin === false && <div className="login-register-contenedor"> 
                        <div>
                            <img className="icono" src="../../public/imagenes/iconos/usuario.png" alt="Botón Login"/>
                            <Link to="/login">Ingresá</Link>
                        </div>

                        <div id="slash">
                            <img className="icono" src="../../public/imagenes/iconos/slash.png" alt="Botón Login"/>
                        </div>

                        <div id="registro">
                            <img className="icono" src="../../public/imagenes/iconos/registro.png" alt="Botón registro"/>
                            <a href="/registro">Registrate</a>
                        </div>
                    </div>}

                    
                    {isLogin && <ul className="nav-cliente-mobile">
                        <div className='user-login'>
                            <div className='avatar-user'><span>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</span></div>
                            <h3>{`${user.nombre} ${user.apellido}`}</h3>
                        </div>
                        <li>
                            <Link to="/mi-cuenta" style={{ fontSize: '16px' }}>Mi cuenta</Link>
                        </li>
                        <li className="cerrar-sesion" style={{ fontSize: '16px' }} onClick={handleCerrarSesion}>  {/* Cerrar sesion implica solicitud fetch y vaciamiento de local storage y del estado global user */}
                            Cerrar sesión
                        </li>
                    </ul>}


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
                        <Link to="/">
                            <img className="iconos-respons" src="../../public/imagenes/iconos/home-blanco.png" alt="inicio"/>
                        </Link>
                        <li className="item-categoria">
                            <Link to="/productos-escalada" className="link-nav">
                                ESCALADA
                            </Link>
                        </li>
                        <li className="item-categoria">
                            <Link to="/productos-camping" className="link-nav">
                                CAMPING
                            </Link>
                        </li>
                        <li className="item-categoria">
                            <Link to="/productos-trekking" className="link-nav">
                                TREKKING
                            </Link>
                        </li>
                    </ul>

                </nav>

                {/* <!-- FIN Menu de categorias visible en version desktop --> */}
            </section>
        </>
    )
}

export default Navbar