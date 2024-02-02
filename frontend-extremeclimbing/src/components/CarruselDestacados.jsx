import React, { useEffect, useState, useRef } from 'react'
import './CarruselDestacados.css'
import CardProductosCarrusel from './CardProductosCarrusel';

const CarruselDestacados = ({ titulo }) => {
    //estado para guardar productos:
    const [productos, setProductos] = useState([]);
    const [arrayCards, setArrayCards] = useState([]);
    //Estados para ancho card y ancho de contenedor general:
    const [anchoCard, setAnchoCard] = useState(null);
    const [anchoContenedor, setAnchoContenedor] = useState(null);
    const [obtuveAnchoCard, setObtuveAnchoCard] = useState(false);
    const [obtuveAnchoCont, setObtuveAnchoCont] = useState(false);
    //Referencias a los nodos:
    const refContenedorGeneral = useRef(null);
    const refContenedorADesplazar = useRef(null);
    const refHijo = useRef(null);
    //Las siguientes variables se declaran para realizar seguimiento de diapos o conjunto de diapos activadas en cada vuelta de desplazamiento:
    const [incrementoDiapo, setIncrementoDiapo] = useState(0);
    const [decrementoDiapo, setDecrementoDiapo] = useState(0);
    //Habilitar deshabilitar flechas:
    const [flechaDerecha, setFlechaDerecha] = useState(false);
    const [flechaIzquierda, setFlechaIzquierda] = useState(false);
    

    //Solicito los productos a la api
    useEffect(() => {
        const soliFetch = async () => {
            try {
                const respuesta = await fetch('http://localhost:8000/productos/aleatorio/camping');
                if (!respuesta) {
                    console.log('Error al solicitar los productos', res.status);
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
    }, [])
    
    useEffect(() => {
        const hijos= refContenedorADesplazar.current.children;
        setArrayCards(Array.from(hijos));
        console.log(hijos);
    },[productos]);

    useEffect(() => {
        setDecrementoDiapo(arrayCards.length - 1);
    }, [arrayCards]);

    const obtenerAncho = (ancho) => {
        setAnchoCard(ancho);
        setObtuveAnchoCard(false);
    };

    //Cargo el ancho del contenedor general:
    useEffect(() => {
        if(refContenedorGeneral.current && !obtuveAnchoCont) {
            setAnchoContenedor(refContenedorGeneral.current.offsetWidth);
            setObtuveAnchoCont(true)
        };
    }, [refContenedorGeneral]);


    const siguientesDiapos = () => {
        setFlechaDerecha(true);
        const diaposAMover = Math.round(anchoContenedor / anchoCard);
        const desplazamiento = anchoCard * diaposAMover
        if (refContenedorADesplazar.current) {
            console.log(refContenedorADesplazar.current)
            /*Ahora se agrega una transicion al contenedor que se desplazará*/
            refContenedorADesplazar.current.style.transition = 'left ease-in-out 500ms';
            /*Creo el movimiento o desplazamiento del carrusel*/
            refContenedorADesplazar.current.style.left = -desplazamiento + 'px';
            setTimeout(() => {
                refContenedorADesplazar.current.style.transition = 'none';

                for(let i= 0; i < diaposAMover; i++) {
                    const prevIncrementoDiapo = incrementoDiapo;
                    if (incrementoDiapo > arrayCards.length - 1) {  
                        setIncrementoDiapo(prevIncrementoDiapo - arrayCards.length);
                        const cardsHijas = refContenedorADesplazar.current.children;
                        for(let i=0; i < cardsHijas.length; i++) {
                            console.log(cardsHijas[i])
                            cardsHijas[i].style.order = "initial";
                        };  
                        setFlechaDerecha(true);
                        return        
                    };
                    const cardsHijas = refContenedorADesplazar.current.children;
                    console.log(cardsHijas);
                    cardsHijas[incrementoDiapo].style.order = cardsHijas.length - 1;
                    setIncrementoDiapo(prevIncrementoDiapo + 1);
                };
                refContenedorADesplazar.current.style.left = 0;
                setDecrementoDiapo(prevIncrementoDiapo => prevIncrementoDiapo - 1);

                setFlechaDerecha(false);
            }, 500);
        };
    };

    const anterioresDiapos = () => {
        setFlechaIzquierda(true);
        const diaposAMover = Math.round(anchoContenedor / anchoCard);
        const desplazamiento = anchoCard * diaposAMover
        refContenedorADesplazar.current.style.transition = 'none';
        for (let i=0; i < diaposAMover; i++) { 
            const prevDecrementoDiapo = decrementoDiapo;
            const cardsHijas = refContenedorADesplazar.current.children;
            if(prevDecrementoDiapo < 0) {
                for(let i=0; i < cardsHijas.length; i++) {
                    console.log(cardsHijas[i])
                    cardsHijas[i].style.order = "initial";
                };
                setDecrementoDiapo(prevDecrementoDiapo + cardsHijas.length); 
            };
            cardsHijas[prevDecrementoDiapo].style.order = - 1;
            setDecrementoDiapo(prevDecrementoDiapo => prevDecrementoDiapo - 1);
        };
        setIncrementoDiapo(prevDecrementoDiapo => prevDecrementoDiapo + 1);
        setFlechaIzquierda(false);
        refContenedorADesplazar.current.style.left = -desplazamiento + 'px';

        setTimeout(() =>{
            refContenedorADesplazar.current.style.transition = 'left ease-in-out 500ms';
            refContenedorADesplazar.current.style.left = 0;
        }, 10)
    };

    
    return (
        <section className="carrusel-deslizante">
            <div className="titulo">
                <h2>Destacados en <span className="estiloTitulo">{titulo}</span></h2>
                <div className="borde"></div>    
            </div>

            <div className="contenedor-general-carrusel" ref= {refContenedorGeneral}>
                
                <div id="contenedor-productos-destacados" ref={refContenedorADesplazar}>
                    {productos.map((producto, index) => {
                        return <CardProductosCarrusel key={(producto.id, index)} producto={producto} refHijo={refHijo}  obtenerAncho={obtenerAncho} obtuveAnchoCard={obtuveAnchoCard} incrementoDiapo={incrementoDiapo} />               
                    })}

                </div> 

                <button className="flecha-izquierda" onClick={anterioresDiapos} disabled={flechaIzquierda}>
                    <i className="fa-solid fa-circle-arrow-left" ></i> 
                </button>

                <button className="flecha-derecha" onClick={siguientesDiapos} disabled={flechaDerecha}>
                    <i className="fa-solid fa-circle-arrow-right" ></i>
                </button>

            </div>
        </section>
    )
}

export default CarruselDestacados