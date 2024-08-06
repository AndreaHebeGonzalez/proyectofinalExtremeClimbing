import React from 'react'
import { useState, useEffect } from 'react'
import CardProductosAdmin from '../../components/Administracion/CardProductosAdmin';
import VentanaModal from '../../components/VentanaModal/VentanaModal';

const ProductosAdmin = () => {
    //estado para guardar productos:
    const [productosAdmin, setProductosAdmin] = useState([]);
    const [formEnviado, setFormEnviado] = useState(false);

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
            const respuesta = await fetch(`/api/productos/${id}`, {
                method: 'DELETE',
            });
            if (respuesta.ok) {
                setTimeout(() => {
                    setFormEnviado(true);
                }, 1000);
            } else {
                console.error('Error al eliminar el producto. Código de estado:', respuesta.status);
            }; 
        } catch (error) {
            ('Error:', error);
        };     
    };

    return (
        <section className='contenedor-admin'>
            <div className="titulo">
                <h2>Lista de productos</h2>
                <div className="borde"></div>    
            </div>

            <div className="contenedor-productos contenedor">
                {productosAdmin.map((producto) => {
                    return <CardProductosAdmin key={(producto.id)} producto={producto} eliminarProducto={eliminarProducto}/>               
                })}
            </div>
            <VentanaModal respuesta = "Producto eliminado!" formEnviado={formEnviado} setFormEnviado={setFormEnviado} />
        </section>
    )
}

export default ProductosAdmin