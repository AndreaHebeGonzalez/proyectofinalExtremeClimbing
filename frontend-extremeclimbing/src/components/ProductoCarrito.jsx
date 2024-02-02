import React from 'react'
import { useState, useEffect } from 'react'
import './ProductoCarrito.css'

const ProductoCarrito = ({ cantidadProductos, handleSumarUno, handleRestarUno }) => {
    return (
        <article className='contenedor-tarjeta'>
            <img className='imagen-producto' src="../../public/imagenes/camping/carpa-domo.jpg" alt="Imagen de producto" />
            <div className= "cont-descripcion">
                <p>Marca</p>
                <h3>Nombre de producto</h3>
                <h4>$ 456156</h4>
                <div className='contenedor-row'> {/* En fila */}
                    <div className='contenedor-row'>
                        <img className="iconos-chicos" src="../../public/imagenes/iconos/sumar.png" alt="Sumar una unidad" onClick={() => handleSumarUno()}/>
                        <input type="number" min={1} value={cantidadProductos} />
                        <img className="iconos-chicos" src="../../public/imagenes/iconos/restar.png" alt="Restar una unidad" onClick={() => handleRestarUno()}/>

                    </div>
                    <img className="iconos-medianos" src="../../public/imagenes/iconos/tachito.png" alt="Eliminar producto del carrito"/>
                </div>
            </div>
        </article>
    )
}

export default ProductoCarrito