import React from 'react'
import { useState, useEffect } from 'react'
import ProductoCarrito from '../../components/ProcesarCompra/ProductoCarrito'
import './ProcesarCompra.css'
import { Link, json } from 'react-router-dom'
import { useCarrito } from '../../EstadosGlobales/useCarrito'

const ProcesarCompra = () => {
    const [costoDeEnvio, setCostoDeEnvio] = useState(2800);
    const productosCarrito = useCarrito((state) => state.productosCarrito);
    const eliminarProducto = useCarrito((state) => state.eliminarProducto);
    const actualizarCarrito = useCarrito((state) => state.actualizarCarrito);
    const [formEnviado, setFormEnviado] = useState(false);
    const [sesionIniciada, setSesionIniciada] = useState(null);
    const [dataUsuario, setDataUsuario] =useState(null);
    
    const [rol, setRol] = useState(null);

    const [conEnvio, setConEnvio] = useState(false);

    useEffect(() => {
        let userData = localStorage.getItem('userData');
        if (userData) {
            userData = JSON.parse(userData);
            setRol(userData.rol);
            if (userData.rol === 'usuario') {
                const id = userData.id;
                const soliFetch = async () => {
                    const respuesta = await fetch(`http://localhost:8000/usuarios/${id}`);
                    if (respuesta.ok) {
                        const dataUsuario = await respuesta.json();
                        setDataUsuario(dataUsuario);
                    } else {
                        console.error('Error al solicitar usuario');
                    };
                };
                soliFetch();
            };
        };
    }, []);

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

    const handleConEnvio = (valor) => {
        setConEnvio(valor)
    }

    const obtenerSubTotal = () => {
        return productosCarrito.reduce((total, producto) => total + producto.precio * producto.cantidadProducto, 0);  
    };

    const handleFinalizarCompra = async () => {
        const ordenCompra = productosCarrito.map((producto) => ({
            productoId: producto.id,
            precioUnitario: Number(producto.precio),
            cantidad: producto.cantidadProducto
        }));
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parseUserData = JSON.parse(userData);
            const idUsuario = parseUserData.id;
            const dataOrden = {
                idUsuario,
                ordenCompra
            };
            console.log(dataOrden);
            try {
                const respuesta = await fetch("http://localhost:8000/ordenes-de-compras", {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataOrden),
                });
                if(respuesta.ok) {
                    console.log('Orden enviada con éxito');
                    actualizarCarrito();
                    localStorage.removeItem('carrito');
                    setFormEnviado(true);
                } else {
                    const datosError= await respuesta.json()
                    console.error('Hubo un problema al enviar la orden', datosError)
                };
            } catch (error) {
                console.error('Error:', error);
            };
        } else {
            console.error('Debe iniciar sesion para realizar la orden de compra');
            setSesionIniciada('no');
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
                <div className='contededor-check-costo-envio'>
                    <div className='check'>
                        <label style={{color: '#000'}}>
                            Con envío
                        </label>
                        <input type="checkbox" onChange={(e) => {
                            handleConEnvio(e.target.checked);
                        }}/>
                    </div>
                    
                    <div className='contenedor-row-end'>{/* En fila */}                    
                        <h5>Calcular costo de envio</h5>
                        <input type="text" placeholder='Cod. Postal' disabled/>
                    </div>
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
                        <p>{conEnvio ? costoDeEnvio: ''}</p>
                    </div>{/* En fila */}
                </div>
                
                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-row-sb'>
                        <h3>Total del pedido</h3>
                        <h4>{obtenerSubTotal() + (conEnvio ? costoDeEnvio: 0)}</h4>
                    </div>{/* En fila */}
                </div>

                {conEnvio && <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-datos'>
                        <h3>Tu pedido será enviado a la siguiente direccion:</h3>
                        <h4><span>Provincia: </span>{dataUsuario && dataUsuario.provincia ? dataUsuario.provincia: ""}</h4>
                        <h4><span>Localidad: </span>{dataUsuario && dataUsuario.localidad ? dataUsuario.localidad: ""}</h4>
                        <h4><span>CP: </span>{dataUsuario && dataUsuario.codigoPostal ? dataUsuario.codigoPostal: ""}</h4>
                        <h4><span>Calle: </span>{dataUsuario && dataUsuario.direccionNombre ? dataUsuario.direccionNombre: ""} {dataUsuario && dataUsuario.direccionNumero ? dataUsuario.direccionNumero:""}</h4>
                    </div>
                </div>}

                <div className='contenedor-column contenedor-sub-total'>{/* En columna */}
                    <div className='contenedor-datos'>
                        <div>
                            <h3>Datos de contacto</h3>
                            <h4><span>Email: </span>{dataUsuario && dataUsuario.email ? dataUsuario.email: ""}</h4>
                            <h4><span>Teléfono: </span>{dataUsuario && dataUsuario.telefono ? dataUsuario.telefono: ""}</h4>
                        </div>
                    </div>
                </div>

                <div className='mensaje'>
                    <button className='btn-estilo2' type='submit' disabled={rol && rol==='admin'} onClick={(e)=> {
                        e.preventDefault();
                        handleFinalizarCompra()}}>
                        Finalizar compra
                    </button>
                    {sesionIniciada === 'no' && <small>Debe iniciar sesion para enviar la orden de compra</small>}
                    {rol && rol==='admin' && <small>No puede realizar ordenes de compra como administrador</small>}
                    {formEnviado && 
                    
                    <span>Recibimos tu pedido. ¡Gracias por tu compra!</span>}
                </div>
            </div>
        </section>
    )
}

export default ProcesarCompra