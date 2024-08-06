import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Btn2 from '../Botones/Btn2';
/* import './CardProductos.css'; */
import { useCarrito } from '../../EstadosGlobales/useCarrito';
import { useAbrirCarrito } from '../../EstadosGlobales/useAbrirCarrito'

const CardProductos = ({ producto }) => {  
    const [productoPresente, setProductoPresente] = useState(false);
    const [urlImg, setUrlImg] = useState("");
    const agregarProducto = useCarrito((state) => state.agregarProducto);
    const productosCarrito = useCarrito((state) => state.productosCarrito);
    const abrirCarrito = useAbrirCarrito((state) => state.abrirCarrito);
    const cerrarCarrito = useAbrirCarrito((state) => state. cerrarCarrito);
    
    //constante para guardar el carrito almacenado en el local storage
    const carritoActualLS = JSON.parse(localStorage.getItem('carrito')) || [];

	

    const urlbase = "http://localhost:8000/";
    const urlCompleta= `${urlbase}${producto.imagenes[0]}`;
    

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

    return (
        <article key= {producto.id} className="producto ancho-producto" style={{maxWidth: "255px"}}>
            <div className="row-img-iconos">
                {productoPresente === false && <img style={{ alignSelf: 'start'}} className="iconos-respons icono-sumar-a-carrito" onClick={handleAgregarProducto} src="/public/imagenes/iconos/sumar-a-carrito.png" alt="Agregalo al carrito"/>}
                {productoPresente && <img style={{ alignSelf: 'start'}} className="iconos-respons icono-sumar-a-carrito" onClick={() => {abrirCarrito()}} src="/public/imagenes/iconos/carrito.png" alt="Ver carrito"/>}
                <img className="articulo" src={urlCompleta} alt="Producto 1"/>
                <img style={{ alignSelf: 'start'}} className="iconos-respons" src="/public/imagenes/iconos/me-gusta-32.png" alt="Sumalo a tus favoritos"/>
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