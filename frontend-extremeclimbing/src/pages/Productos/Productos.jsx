import React from 'react'
import { useState, useEffect } from 'react'
import CardProductos from '../../components/Productos/CardProductos';
import './Productos.css'
import Cart from '../../components/Carrito/Carrito'

const Productos = () => {

    //estado para guardar productos:
    const [productos, setProductos] = useState([]);
    
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState();
    const [categoria, setCategoria] = useState("");
    const [ordenarPor, setOrdenarPor] = useState("");


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
                setProductos(data);
                
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            }
        }
        soliFetch();
    }, []);

    useEffect(() => {
        const soliFetch = async () => {
            const respuesta = await fetch('http://localhost:8000/productos/categorias/categorias');
            const data = await respuesta.json();
            setCategorias(data);
        };

        soliFetch();
    }, []);

    return (
        <>
            <Cart />
            <section className='contenedor-admin margin'>
                <div className="titulo">
                    <h2>Productos</h2>
                    <div className="borde"></div>    
                </div>
                <form className='contenedor-titulo-filtro'>
                    <h3 style={{ alignSelf: 'start'}}>Buscar por:</h3>
                    <div className='contenedor-filtro'>
                        <div className='contenedor-row-filtro'>
                            <label>
                                Nombre:{" "} </label>
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        
                        <div className='contenedor-row-filtro'>
                            <label>
                                Precio minimo:{" "} </label>
                            <input
                                min={0}
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.valueAsNumber)}
                            />
                        </div>
                            
                        <div className='contenedor-row-filtro'>
                            <label className='contenedor-row'>
                                Categoria:{" "} </label>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <option value="">Todas las categorias</option>
                                {categorias.map((categoria, i) => (
                                <option key={`product-category-item-${i}`} value={categoria}>
                                    {categoria}
                                </option>
                                ))}
                            </select>
                        </div> 

                        <div className='contenedor-row-filtro'>
                            <label className='contenedor-row'>
                                Ordenar por: </label>
                            <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
                                <option value="">No ordenar</option>
                                <option value="menorAMayor">De menor a mayor precio</option>
                                <option value="mayorAMenor">De mayor a menor precio</option>
                                <option value="alfabetico">Alfabetico</option>
                            </select>
                        </div>
                    </div>
                    
                    
                    
                </form>
                
                <div className="contenedor-productos contenedor">
                    {productos
                    .filter((producto) =>
                    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
                    )
                    .filter((producto) => {
                        if (!precio) return true;
                        return producto.precio > precio;
                    })
                    .filter((producto) => {
                        if (!categoria) return true;
                        return producto.categoria === categoria;
                    })
                    .sort((a, b) => {
                        if (!ordenarPor) return 0;
                        if (ordenarPor === "menorAMayor") return a.precio - b.precio;
                        if (ordenarPor === "mayorAMenor") return b.precio - a.precio;
                        return a.nombre.charCodeAt(0) - b.nombre.charCodeAt(0);
                    })
                    .map((producto) => (
                        <CardProductos key={(producto.id)} producto={producto} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Productos