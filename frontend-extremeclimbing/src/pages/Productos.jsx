import React from 'react'
import { useState, useEffect } from 'react'
import CardProductos from '../components/CardProductos';
import './Productos.css'

const ProductosAdmin = () => {

    //estado para guardar productos:
    const [productosAdmin, setProductosAdmin] = useState([]);
    
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState();
    const [categoria, setCategoria] = useState("");
    const [ordenarPor, setOrdenarPor] = useState("");

    useEffect(() => {
        const soliPorCategoria = async () => {

        }
        
        /* fetch("https://fakestoreapi.com/products/categoria")
            .then((resp) => resp.json())
            .then((categories) => setCategories(categories)); */
    }, []);

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

    return (
        <>
            <section className='contenedor-admin margin'>
                <div className="titulo">
                    <h2 class="h2forms">Productos</h2>
                    <div className="borde"></div>    
                </div>

                <div className="contenedor-productos contenedor">
                    {productosAdmin.map((producto) => {
                        return <CardProductos key={(producto.id)} producto={producto} />               
                    })}
                </div>
            </section>
        </>
    )
}

export default ProductosAdmin