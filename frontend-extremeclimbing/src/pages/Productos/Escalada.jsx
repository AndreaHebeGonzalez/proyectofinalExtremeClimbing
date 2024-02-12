import React from 'react';
import { useState, useEffect } from 'react';
import CardProductos from '../../components/Productos/CardProductos';
import './Productos.css';

const Escalada = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const soliFetch = async () => {
            try {
                const respuesta = await fetch('http://localhost:8000/productos/categoria/escalada');
                if (!respuesta) {
                    console.log('Error al solicitar los productos');
                    return 
                };
                const data = await respuesta.json();
                console.log(data)
                setProductos(data);
                
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            }
        }
        soliFetch();
    }, []);
    
    return (
        <section className='contenedor-admin' style={{ margin: '7vw 3vw'}}>
            <div className="titulo">
                <h2>Productos de escalada</h2>
                <div className="borde"></div>    
            </div>
            <div className="contenedor-productos .contenedor-prod-row">
                {productos.map((producto) => (
                    <CardProductos key={(producto.id)} producto={producto} />
                ))}
            </div>
        </section>
    )
}

export default Escalada