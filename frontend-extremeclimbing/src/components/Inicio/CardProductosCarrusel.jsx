import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useCarrito } from '../../EstadosGlobales/useCarrito';
import { useAbrirCarrito } from '../../EstadosGlobales/useAbrirCarrito'

const CardProductosCarrusel = ({ producto, refHijo, obtenerAncho, obtuveAnchoCard }) => {
    const cardRef = useRef(null);
    const [productoPresente, setProductoPresente] = useState(false);
    const [urlImg, setUrlImg] = useState("");
    const agregarProducto = useCarrito((state) => state.agregarProducto);
    const productosCarrito = useCarrito((state) => state.productosCarrito);
    const abrirCarrito = useAbrirCarrito((state) => state.abrirCarrito);
    const cerrarCarrito = useAbrirCarrito((state) => state. cerrarCarrito);
    const carritoActualLS = JSON.parse(localStorage.getItem('carrito')) || [];

    useEffect(() => {
        if (cardRef.current && !obtuveAnchoCard) {
            const ancho = cardRef.current.offsetWidth
            obtenerAncho(ancho)
        };
    }, [refHijo]);

    useEffect(() => {
		setProductoPresente(productosCarrito.some(p => p.id === producto.id))
	}, [productosCarrito]);

    useEffect(() => {
        if (producto && producto.imagenes && producto.imagenes.length > 0) {
            setUrlImg(`${urlbase}${producto.imagenes[0]}`);
        }
    }, [producto]);

    const handleAgregarProducto = () => {
		if (!productoPresente) {
            //Agrego producto al estado global
			agregarProducto({ urlImg, nombre: producto.nombre, marca: producto.marca, precio: producto.precio, id: producto.id, cantidadProducto: 1 })
            //Agrego producto al LS:
            carritoActualLS.push({ urlImg, nombre: producto.nombre, marca: producto.marca, precio: producto.precio, id: producto.id, cantidadProducto: 1 });
            localStorage.setItem('carrito', JSON.stringify(carritoActualLS));
            abrirCarrito();
			setTimeout(() => {
				cerrarCarrito();
			}, 2500)
        };
	};
    
    const urlbase = "http://localhost:8000/";
    const urlCompleta= `${urlbase}${producto.imagenes[0]}`;
    
    return (
        <>
        
        <article key= {producto.id} className="contenedor-producto" ref={cardRef}> 
            <div className="producto">
                <div className="row-img-iconos">
                    {productoPresente === false && <img style={{ alignSelf: 'start'}} className="iconos-respons icono-sumar-a-carrito" onClick={handleAgregarProducto} src="/public/imagenes/iconos/sumar-a-carrito.png" alt="Agregalo al carrito"/>}
                    {productoPresente && <img style={{ alignSelf: 'start'}} className="iconos-respons icono-sumar-a-carrito" onClick={() => {abrirCarrito()}} src="/public/imagenes/iconos/carrito.png" alt="Ver carrito"/>}
                    <img className="articulo" src={urlCompleta} alt="Producto 1" />
                    <img className="iconos-respons" src="/public/imagenes/iconos/me-gusta-32.png" alt="Sumalo a tus favoritos"/>
                </div>
                <div className="valoracion">
                    <img  src="/public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img src="/public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="/public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="/public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="/public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
                </div>
                
                <h4>{producto.marca}</h4>

                <div style= {{padding: "0.1rem", overflow: "hidden", width: "90%"}}>
                    <h3>{producto.nombre}</h3>
                </div>
                
                
                <div className="precio">
                    <img src="/public/imagenes/iconos/efectivo.png" alt="" className="iconos-respons"/>
                    <h3><span>$</span>{producto.precio}</h3>
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