import { useState } from 'react';
import { Link } from 'react-router-dom';
import Btn2 from '../Botones/Btn2';
/* import './CardProductos.css'; */

const CardProductos = ({ producto }) => {  

    const urlbase = "http://localhost:8000/";
    const urlCompleta= `${urlbase}${producto.imagenes[0]}`;


    
    return (
        <article key= {producto.id} className="producto" style={{maxWidth: "250px"}}>
            <div className="row-img-iconos">
                <img style={{ alignSelf: 'start'}} className="iconos-respons icono-sumar-a-carrito" src="../../public/imagenes/iconos/sumar-a-carrito.png" alt="Agregalo al carrito"/>
                <img className="articulo" src={urlCompleta} alt="Producto 1" />
                <img style={{ alignSelf: 'start'}} className="iconos-respons" src="../../public/imagenes/iconos/me-gusta-32.png" alt="Sumalo a tus favoritos"/>
            </div>
            <div className="valoracion">
                <img  src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
            </div>
            
            <h4>{producto.marca}</h4>

            <div style= {{padding: "0.1rem", overflow: "hidden", width: "90%"}}>
                <h3>{producto.nombre}</h3>
            </div>
            
            
            <div className="precio">
                <img src="../../public/imagenes/iconos/efectivo.png" alt="" className="iconos-respons"/>
                <p><span>$</span>{producto.precio}</p>
            </div>
            <div className='contenedor-btn'>
                <Link to={`/detalle-producto/${producto.id}`}>
                    <Btn2 accion = {'Ver detalles'} />
                </Link>
            </div>
            
        </article>
    )
}

export default CardProductos