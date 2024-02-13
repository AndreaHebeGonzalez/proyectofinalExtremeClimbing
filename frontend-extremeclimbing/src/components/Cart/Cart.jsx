import React, { useState } from 'react'

import './Cart.css'
import Btn2 from '../Botones/Btn2'
import { useAbrirCarrito } from '../../EstadosGlobales/useAbrirCarrito'
import { useCarrito } from '../../EstadosGlobales/useCarrito'
import { Link } from 'react-router-dom'

const Cart = () => {
    const carritoAbierto = useAbrirCarrito((state) => state.carritoAbierto);
    const cerrarCarrito = useAbrirCarrito((state) => state.cerrarCarrito);
    const productosCarrito = useCarrito((state) => state.productosCarrito);
    const eliminarProducto = useCarrito((state) => state.eliminarProducto);
    const actualizarCarrito = useCarrito((state) => state.actualizarCarrito);
    let carritoActualLS = JSON.parse(localStorage.getItem('carrito'));
    
    const eliminarProductoLS = (id) => {
        carritoActualLS = carritoActualLS.filter(p =>  p.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carritoActualLS));
    };

    const handleSumarUno = (index) => {
        const nuevosProductos = [...productosCarrito];
        nuevosProductos[index].cantidadProducto++;
        actualizarCarrito(nuevosProductos);
    }

    const handleRestarUno = (index) => {
        const nuevosProductos = [...productosCarrito];
        if (nuevosProductos[index].cantidadProducto > 1) {
            nuevosProductos[index].cantidadProducto--;
            actualizarCarrito(nuevosProductos);
        };
    };

    const obtenerTotal = () => {
        return productosCarrito.reduce((total, producto) => total + producto.precio * producto.cantidadProducto, 0);
        
    };

    return (
        <div className={`ventana-carrito ${carritoAbierto ? "carrito-aparece":""}`}>
            <div className="titulo-cart">
                <h3>Tu carrito</h3>
                <div className="cerrar-cart" onClick={() => cerrarCarrito()}>
                    <img className="icono-respons" src="../../../public/imagenes/iconos/cerrar-cart.png" alt=""/>
                </div>
            </div>
            <div className='list-items-cart'>
                    {productosCarrito.length === 0 ? <span className='carrito-vacio'>¡Carrito vacío!</span> : productosCarrito.map((p, index) => {
                    return <div key={`carrito${p.id}`}  className="item-cart">
                    <img className='img-producto' src= {p.urlImg} alt="Imagen producto"/>
                    <h3>{p.nombre}</h3>
                    <div className="cantidad">
                        <img className="icono" src="../../../public/imagenes/iconos/sumar.png" onClick={() => handleSumarUno(index)} alt="sumar uno"/>
                        <input type="number" min={1} value={p.cantidadProducto} readOnly/>
                        <img className="icono" src="../../../public/imagenes/iconos/restar.png" onClick={() => handleRestarUno(index)} alt="restar uno"/>
                    </div>
                    <p>$<span>{p.precio * p.cantidadProducto}</span></p>
                    <img onClick={() => {
                        eliminarProducto(index);
                        eliminarProductoLS(p.id);
                        }} className="iconos-medianos" src="../../public/imagenes/iconos/tachito.png" alt="Eliminar producto del carrito"/>
                </div>              
                })}
            </div>
            <div className="footer-cart">
                <div className="total-cart">
                    <span>Subtotal</span>
                    <span>${productosCarrito ? `${obtenerTotal()}`: '0'}</span>
                </div>
                <div className="cont-btn">
                <Link to="/procesar-compra">
                <Btn2 accion='Procesar compra' disabled={productosCarrito.length === 0} />
                </Link>
                </div>
            </div>
            
        </div>
    )
}

export default Cart