import React from 'react'
import { useState, useEffect } from 'react'
import './ProductoCarrito.css'

const ProductoCarrito = ({ producto, index, handleSumarUno, handleRestarUno, eliminarProducto }) => {


    return (
        <article className='contenedor-tarjeta'>
            <img className='imagen-producto' src={producto.urlImg} alt="Imagen de producto" />
            <div className= "cont-descripcion">
                <p>{producto.marca}</p>
                <h3>{producto.nombre}</h3>
                <p>$<span>{producto.precio * producto.cantidadProducto}</span></p>
                <div className='contenedor-row'> {/* En fila */}
                    <div className='contenedor-row'>
                        <img className="iconos-chicos" src="../../public/imagenes/iconos/sumar.png" alt="Sumar una unidad" onClick={() => handleSumarUno(index)}/>
                        <input type="number" min={1} value={producto.cantidadProducto} readOnly/>
                        <img className="iconos-chicos" src="../../public/imagenes/iconos/restar.png" alt="Restar una unidad" onClick={() => handleRestarUno(index)}/>

                    </div>
                    <img className="iconos-medianos" onClick={() => eliminarProducto(index)} src="../../public/imagenes/iconos/tachito.png" alt="Eliminar producto del carrito"/>
                </div>
            </div>
        </article>
    )
}

export default ProductoCarrito