import { useEffect, useState } from 'react'
import React from 'react'

const Imagenes = ({ producto }) => {
    const [urlCompleta, setUrlCompleta] = useState("");

    const [arrancaIndex, setArrancaIndex] = useState(0);

    const [largoArray, setLargoArray] = useState(0);

    const handleClickIzquierda = () => {
        setArrancaIndex(prevIndex=> Math.max(prevIndex - 1, 0));
    };

    const handleClickDerecha = () => {
        setArrancaIndex(prevIndex=> Math.min(prevIndex + 1, largoArray - 5));
    };

    const urlbase = "http://localhost:8000/";
    
    useEffect(() => {
        if (producto && producto.imagenes && producto.imagenes.length > 0) {
            setUrlCompleta(`${urlbase}${producto.imagenes[0]}`);
            setLargoArray(producto.imagenes.length)
        }
    }, [producto]);

    return (
        <section className="imagenes-producto">
            <div className="cont-img-grande">
                <img src={urlCompleta} alt="Imagen producto"/>
            </div>
            <div className='cont-carrusel-miniatura'>
                {largoArray > 5 && <button onClick={handleClickIzquierda} disabled={arrancaIndex === 0}>
                    <img className="iconos-respons" src="../../public/imagenes/iconos/anterior.png" alt="siguiente"/>
                </button>}
                
                <div className="cont-imgs-small">
                    {
                        producto && producto.imagenes && producto.imagenes.slice(arrancaIndex, arrancaIndex + 5).map((url) => {
                            const urlComp = `${urlbase}${url}`;
                            return <div key={`${producto.id}${url}`} onClick={() => {
                                setUrlCompleta(`${urlbase}${url}`);
                            }}><img src={urlComp} alt="Imágenes miniatura"/></div>
                        })
                    }
                </div>
                {largoArray > 5 && <button onClick={handleClickDerecha} disabled={arrancaIndex >= largoArray - 5}>
                    <img className="iconos-respons" src="../../public/imagenes/iconos/siguiente.png" alt="siguiente"/>
                </button>}
                
            </div>
            
        </section>
    )
}

export default Imagenes