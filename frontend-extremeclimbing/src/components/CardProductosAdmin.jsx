import { Link } from 'react-router-dom';

const CardProductosAdmin = ({ producto, eliminarProducto }) => {    
    
    const urlbase = "http://localhost:8000/";
    const urlCompleta= `${urlbase}${producto.imagenes[0]}`;
    
    return (
        <article key= {producto.id} className="producto" style={{maxWidth: "250px"}}>
            <div className="row-img-iconos">
                <img className="articulo" src={urlCompleta} alt="Producto 1" />
            </div>
            <div className="valoracion">
                <img  src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-llena.png" alt="estrella llena"/><img className="iconos-respons" src="../../public/imagenes/iconos/estrella-vacia.png" alt="estrella vacía"/>
            </div>
            
            <h5>{producto.marca}</h5>

            <div style= {{padding: "0.1rem", overflow: "hidden", width: "90%"}}>
                <h4>{producto.nombre}</h4>
            </div>
            
            
            <div className="precio">
                <img src="../../public/imagenes/iconos/efectivo.png" alt="" className="iconos-respons"/>
                <h4><span>$</span>{producto.precio}</h4>
            </div>
            <div className='contenedor-btn'>
                <button className="btn-2" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                <Link to={`/modificar-producto/${producto.id}`}>
                    <button className="btn-2">Modificar</button>
                </Link>
            </div>
            
        </article>
    )
}

export default CardProductosAdmin