import React from 'react'

const ProductoCard = ({ producto }) => {
    
    return (
        <articles className="contenedor-producto"> 
            <div className="producto">
                <div className="row-img-iconos">
                    <img className="iconos-respons" src="../../public/imagenes/iconos/sumar-a-carrito.png" alt="Agregalo al carrito"/>
                    <img className="articulo" src="http://localhost:8000/imagenes/camping/1704490140704-img-1.jpg" alt="Producto 1"/>
                    <img className="iconos-respons" src="../../public/imagenes/iconos/me-gusta-32.png" alt="Sumalo a tus favoritos"/>
                </div>
                <div className="valoracion">
                    <img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
                </div>
                
                <h5>{producto.marca}</h5>

                <h4>{producto.nombre}</h4>
                
                <div className="precio">
                    <img src="../../public/imagenes/iconos/efectivo.png" alt="" className="iconos-respons"/>
                    <h4><span>$</span>{producto.precio}</h4>
                </div>

                <a href="#"><button className="btn-2">Ver más</button></a>
            </div>
        </articles>
    )
}

export default ProductoCard