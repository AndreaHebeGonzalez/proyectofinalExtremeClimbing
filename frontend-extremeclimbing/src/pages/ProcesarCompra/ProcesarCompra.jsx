import React from 'react'
import { useState, useEffect } from 'react'
import ProductoCarrito from '../../components/ProcesarCompra/ProductoCarrito'
import './ProcesarCompra.css'
import { Link } from 'react-router-dom'

const ProcesarCompra = () => {
    const [cantidadProductos, setCantidadProductos] = useState(1);

    const handleSumarUno = () => {
        setCantidadProductos(cantidadProductos + 1);
    }

    const handleRestarUno = () => {
        if (cantidadProductos > 0) {
            setCantidadProductos(cantidadProductos - 1);
        };
    };


    return (
        <section className="contenedor-pages">
            <div className="titulo">
                <h2>Carrito de compras</h2>
                <div className="borde"></div>    
            </div>
            {cantidadProductos === 0 && <h3>¡Carrito vacío!</h3>}
            {cantidadProductos > 0 &&
            <ProductoCarrito cantidadProductos ={cantidadProductos} handleSumarUno={handleSumarUno} handleRestarUno={handleRestarUno} />}

            <div className='contenedor-column'>
                <div className='contenedor-row-end'>{/* En fila */}
                    <h5>Calcular costo de envio</h5>
                    <input type="text" placeholder='Cod. Postal' disabled/>
                </div>
                <Link to="" style={{ alignSelf: 'flex-start'}}> 
                    <button className='btn-estilo1'>Seguir Comprando</button>
                </Link>

                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-row-sb'>
                        <h3>Subtotal</h3>
                        <h4>$452135</h4>
                    </div>{/* En fila */}

                    <div className='contenedor-row-sb'>
                        <p>Costo de envío</p>
                        <p>$2800</p>
                    </div>{/* En fila */}
                </div>
                
                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-row-sb'>
                        <h3>Total del pedido</h3>
                        <h4>$2800</h4>
                    </div>{/* En fila */}
                </div>

                <button className='btn-estilo2' type='submit' style={{ alignSelf: 'flex-start'}} onClick={(e)=> {
                    e.preventDefault();
                    handleCompra()}}>
                    Finalizar compra
                </button>
            </div>
        </section>
    )
}

export default ProcesarCompra