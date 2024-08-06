import React from 'react';
import { useState, useEffect } from 'react';
import CardProductos from '../../components/Productos/CardProductos';
import '../../pages/Productos/Productos.css'
import './CarruselDestacados.css'

const Destacados = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const soliFetch = async () => {
            try {
                const respuesta = await fetch('/api/productos/aleatorio/camping');
                if (!respuesta) {
                    console.log('Error al solicitar los productos', res.status);
                    return 
                };
                const data = await respuesta.json();
                console.log(data);
                setProductos(data);
                
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            }
        }
        soliFetch();
    }, [])
    
    return (
        <section className="carrusel-deslizante">
            <div className="titulo">
                <h2>Destacados en <span className="estiloTitulo">Extreme Climbing</span></h2>
                <div className="borde"></div>    
            </div>

            <div className="contenedor-productos .contenedor-prod-row" style={{padding:'0.5rem 1.3rem'}}>
                {productos.map((producto) => (
                    <CardProductos key={(producto.id)} producto={producto} />
                ))}
            </div>
        </section>
    )
}

export default Destacados