import React from 'react'
import { useState, useEffect } from 'react'
import CardProductosAdmin from '../components/CardProductosAdmin';
import VentanaModal from '../components/VentanaModal';

const ProductosAdmin = () => {
    //estado para guardar productos:
    const [productosAdmin, setProductosAdmin] = useState([]);
    const [envioForm, setEnvioForm] = useState(false);

    useEffect(() => {
        const soliFetch = async () => {
            try {
                const respuesta = await fetch('http://localhost:8000/productos/');
                if (!respuesta) {
                    console.log('Error al solicitar los productos');
                    return 
                };
                const data = await respuesta.json();
                console.log(data)
                setProductosAdmin(data);
                
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            }
        }
        soliFetch();
    }, []);

    const eliminarProducto = async(id) => {
        try {
            const respuesta = await fetch(`http://localhost:8000/productos/${id}`, {
                method: 'DELETE',
            });
            if(!respuesta.ok) {
                console.error('Error al eliminar el producto:', response.status);
                return;
            };
            console.log()
        } catch (error) {
            ('Error:', error);
        }; 
        setEnvioForm(true);     
    };

    return (
        <section className='contenedor-admin'>
            <div className="titulo">
                <h2 className="h2forms">Lista de productos</h2>
                <div className="borde"></div>    
            </div>

            <div className="contenedor-productos contenedor">
                {productosAdmin.map((producto) => {
                    return <CardProductosAdmin key={(producto.id)} producto={producto} eliminarProducto={() => eliminarProducto(producto.id)}/>               
                })}
            </div>
            <VentanaModal respuesta = "Producto eliminado!" envioForm={envioForm} setEnvioForm={setEnvioForm} />
        </section>
    )
}

export default ProductosAdmin