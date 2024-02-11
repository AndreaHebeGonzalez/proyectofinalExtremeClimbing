import React from 'react'
import { useState, useEffect } from 'react'
import ProductoCarrito from '../../components/ProcesarCompra/ProductoCarrito'
import './ProcesarCompra.css'
import { Link } from 'react-router-dom'
import { useCarrito } from '../../EstadosGlobales/useCarrito'

const ProcesarCompra = () => {
    const [costoDeEnvio, setCostoDeEnvio] = useState(2800);
    const productosCarrito = useCarrito((state) => state.productosCarrito);
    const eliminarProducto = useCarrito((state) => state.eliminarProducto);
    const actualizarCarrito = useCarrito((state) => state.actualizarCarrito);
    const [formEnviado, setFormEnviado] = useState(false);

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

    const obtenerSubTotal = () => {
        return productosCarrito.reduce((total, producto) => total + producto.precio * producto.cantidadProducto, 0);  
    };

    const handleFinalizarCompra = async () => {
        const ordenCompra = productosCarrito.map((producto) => ({
            productoId: producto.id,
            precioUnitario: producto.precio,
            cantidad: producto.cantidadProducto
        }));
        try {
            const respuesta = await fetch("http://localhost:8000/ordenes-de-compras", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordenCompra),
            });
            if(respuesta.ok) {
                setFormEnviado(true);
            } else {
                const datosError= await respuesta.json()
                console.error('Hubo un problema al enviar la orden', datosError)
            };
        } catch (error) {
            console.error('Error:', error);
        };
    };

    return (
        <section className="contenedor-pages">
            <div className="titulo">
                <h2>Carrito de compras</h2>
                <div className="borde"></div>    
            </div>
            {productosCarrito.length === 0 && <h3>¡Carrito vacío!</h3>}
            {productosCarrito.length > 0 && productosCarrito.map((p, index) => {
                return <ProductoCarrito key={`carrito${p.id}${p.nombre}`} producto={p} index={index} handleSumarUno={handleSumarUno} handleRestarUno={handleRestarUno} eliminarProducto={eliminarProducto} />})}
            <div className='contenedor-column'>
                <div className='contenedor-row-end'>{/* En fila */}
                    <h5>Calcular costo de envio</h5>
                    <input type="text" placeholder='Cod. Postal' disabled/>
                </div>
                <Link to="/productos" style={{ alignSelf: 'flex-start'}}> 

                    <button className='btn-estilo1'>
                    <img className="iconos-btn" src="../../public/imagenes/iconos/arrow-atras.png" alt="icono de registrarse"/>
                        Seguir Comprando
                    </button>
                </Link>

                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-row-sb'>
                        <h3>Subtotal</h3>
                        <h4>{productosCarrito ? `${obtenerSubTotal()}`: '0'}</h4>
                    </div>{/* En fila */}

                    <div className='contenedor-row-sb'>
                        <p>Costo de envío</p>
                        <p>{costoDeEnvio}</p>
                    </div>{/* En fila */}
                </div>
                
                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-row-sb'>
                        <h3>Total del pedido</h3>
                        <h4>{obtenerSubTotal() + costoDeEnvio}</h4>
                    </div>{/* En fila */}
                </div>

                <button className='btn-estilo2' type='submit' style={{ alignSelf: 'flex-start'}} onClick={(e)=> {
                    e.preventDefault();
                    handleFinalizarCompra()}}>
                    Finalizar compra
                </button>
            </div>
        </section>
    )
}

export default ProcesarCompra