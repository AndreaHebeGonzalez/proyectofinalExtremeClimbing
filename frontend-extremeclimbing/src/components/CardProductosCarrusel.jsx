import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

const CardProductosCarrusel = ({ producto, refHijo, obtenerAncho, obtuveAnchoCard }) => {
    const cardRef = useRef(null);
    

    useEffect(() => {
        if (cardRef.current && !obtuveAnchoCard) {
            const ancho = cardRef.current.offsetWidth
            obtenerAncho(ancho)
        };
    }, [refHijo]);
    
    const urlbase = "http://localhost:8000/";
    const urlCompleta= `${urlbase}${producto.imagenes[0]}`;
    
    return (
        <>
        
        <article key= {producto.id} className="contenedor-producto" ref={cardRef}> 
            <div className="producto">
                <div className="row-img-iconos">
                    <img className="iconos-respons" src="../../public/imagenes/iconos/sumar-a-carrito.png" alt="Agregalo al carrito"/>
                    <img className="articulo" src={urlCompleta} alt="Producto 1" />
                    <img className="iconos-respons" src="../../public/imagenes/iconos/me-gusta-32.png" alt="Sumalo a tus favoritos"/>
                </div>
                <div className="valoracion">
                    <img  src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
                </div>
                
                <h5>{producto.marca}</h5>

                <div style= {{padding: "0.1rem", overflow: "hidden", width: "90%"}}>
                    <h4>{producto.nombre}</h4>
                </div>
                
                
                <div className="precio">
                    <img src="../../public/imagenes/iconos/efectivo.png" alt="" className="iconos-respons"/>
                    <h4><span>$</span>{producto.precio}</h4>
                </div>

                <Link to={`/detalle-producto/${producto.id}`}>
                    <button className="btn-2">Ver más</button>
                </Link>    
            </div>
        </article>
        </>
    )
}

export default CardProductosCarrusel