import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './DetalleProducto.css'
import Imagenes from '../../components/DetallesProductos/Imagenes';
import { useCarrito } from '../../EstadosGlobales/useCarrito';

const DetalleProducto = () => {
	const [producto, setProducto] = useState([]);
	const [mostrarCaracteristicas, setMostrarCaracteristicas] = useState(false)
	const [mostrarInfoTecnica, setMostrarInfoTecnica] = useState(false);	
	const [urlImg, setUrlImg] = useState("");
	const [productoPresente, setProductoPresente] = useState(false);
	const agregarProducto = useCarrito((state) => state.agregarProducto);
	const productosCarrito = useCarrito((state) => state.productosCarrito);

	const carritoActualLS = JSON.parse(localStorage.getItem('carrito')) || [];

	const { id } = useParams();
    
	
	useEffect(() => {
        const reqFetch = async () => {
            try {
                const respuesta = await fetch(`http://localhost:8000/productos/${id}`);
                if (!respuesta) {
                    console.log('Error al solicitar producto');
                    return 
                };
                const data = await respuesta.json();
                setProducto(data);
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            };
        };
        reqFetch();
    }, []);

	/* useEffect(() => {
		setProductoPresente(productosCarrito.some(p => p.id === producto.id))
	}, []) */

	useEffect(() => {
		setProductoPresente(productosCarrito.some(p => p.id === producto.id))
	}, [productosCarrito])
	

	const urlbase = "http://localhost:8000/";
    
    useEffect(() => {
        if (producto && producto.imagenes && producto.imagenes.length > 0) {
            setUrlImg(`${urlbase}${producto.imagenes[0]}`);
        }
    }, [producto]);

	const handleClickCaracteristicas = () => {
		setMostrarCaracteristicas(!mostrarCaracteristicas);
	};

	const handleClickInfoTecnica = () => {
		setMostrarInfoTecnica(!mostrarInfoTecnica);
	};

	const handleAgregarProducto = () => {
		const productoPresente = productosCarrito.some(p => p.id === producto.id);
		if (!productoPresente) {
			//Agrego producto al estado global:
			agregarProducto({ urlImg, nombre: producto.nombre, marca: producto.marca, precio: producto.precio, id: producto.id, cantidadProducto: 1 })
			//Agrego producto al LS:
			carritoActualLS.push({ urlImg, nombre: producto.nombre, marca: producto.marca, precio: producto.precio, id: producto.id, cantidadProducto: 1 });
			localStorage.setItem('carrito', JSON.stringify(carritoActualLS));
		} ;
	};

	return (
		<div>
			{
				producto && <Imagenes producto={producto} />
			}
			

			<section className="descripcion">
					<div className="area-titulo">
						<h4 style={{ alignSelf: 'start'}}>{producto.marca}</h4>
						<h3>{producto.nombre}</h3>
						<div className='bloque-valoracion-precio'>
							<div className="bloque-precio">
								<div>
									<p><span style={{color: "red"}}>{producto.precio}</span></p>
									<p><span>(1 pago)</span></p>
								</div>
								<div>
									<p>$<span>{producto.precio}</span></p>
									<p><span>(3 cuotas fijas)</span></p>
								</div>   
							</div>
							<div className="valoracion">
								<img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
							</div>
						</div>
						
					</div>
				

					<div className="descripcion-texto">
						<p>
							{producto.descripcion}
						</p>
						<div className="caracteristicas">
							<div className="caract-desplegable" onClick={() => {
								handleClickCaracteristicas();
							}}>
								<span>Caracteristicas</span>
								<img className={`iconos-respons ${mostrarCaracteristicas ? 'rotar-icono-desplegar':''}`} src="../../public/imagenes/iconos/desplegable.png" alt="Desplegar"/>
							</div>
							<div className= {`cont-list-caracteristicas ${mostrarCaracteristicas ? 'mostar-caracteristicas':''}`} >

								<ul className={`lista-caracteristicas ${mostrarCaracteristicas ? 'padding-lista-caract':''}`}>
									{producto && producto.caracteristicas && producto.caracteristicas.map((caracteristica, index) => {
										return <li key= {`${producto.id}caracteristica${index}`}>{caracteristica}</li>
									})}
								</ul>

							</div>
						</div>
						
						{producto.infoTecnica && 
						<div className="caracteristicas">
							<div className="caract-desplegable" onClick={() => {
								handleClickInfoTecnica();
							}}>
								<span>Información técnica</span>
								<img className={`iconos-respons ${mostrarInfoTecnica ? 'rotar-icono-desplegar':''}`} src="../../public/imagenes/iconos/desplegable.png" alt="Desplegar"/>
							</div>
							<div className={`cont-list-caracteristicas ${mostrarInfoTecnica ? 'mostar-caracteristicas':''}`}>

								<ul className={`lista-caracteristicas ${mostrarInfoTecnica ? 'padding-lista-caract':''}`}>
									{producto && producto.infoTecnica && producto.infoTecnica.map((infoTec) => {
											return <li>{infoTec}</li>
									})}
								</ul>

							</div>
						</div>
						}
					</div>

					<div className="agregar-a-carrito">
						{/* <input type="number" id="numero" min={0} value={cantidadProducto} onChange={(e) => {
							setCantidadProducto(e.target.value);
						}}/> */}
						<button className="btn-3" onClick={handleAgregarProducto} disabled={productoPresente}>Agregar al carrito</button>
					</div>
			</section>
		</div>
	)
}

export default DetalleProducto