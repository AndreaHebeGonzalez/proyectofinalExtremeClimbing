import React, { useEffect } from 'react'
import './Inicio.css'
import CarruselMarcas from '../../components/Inicio/CarruselMarcas'
import Banner1 from '../../components/Inicio/Banner1'
import Destacados from '../../components/Inicio/Destacados'
import Slider  from '../../components/Inicio/Slider'

const Inicio = () => {
    
    return (
        <div className="fondoPages">  
            <Slider />
            {/* <!-- Fin Portada --> */}

            {/* <!-- Seccion categorias --> */}
            <section id="categorias" className="contenedor">
                <div className="cat-1">
                    <h2>Escalada</h2>
                    <img  src=" ../../../../../public/imagenes/Escalada.jpg " alt="Imágen categoria escalada" width="100%" height="auto"/>
                </div>
                <div>
                    <div className="cat-2">
                        <h2>Camping</h2>
                        <img src="../../public/imagenes/camping.jpg" alt="Imágen categoria camping" width="100%" height="auto"/>
                    </div>
                    
                    <div className="cat-3" style= {{ width: "48.5%" }}>
                        <h2>Trekking</h2>
                        <img  src="../../public/imagenes/trekking.jpg" alt="Imágen categoria trekking" width="100%" height="auto"/> 
                    </div>
                </div>
            </section>
            {/* <!-- FIN Seccion categorias --> */}
            
            
            <Destacados />
            {/* <!-- Seccion bunner --> */}
            <Banner1 />
            {/* <!-- FIN Seccion bunner --> */}

            {/* <!-- Seccion carrousel de marcas, solo css, me funcionó triplicando la cantidad de imágenes, cree un css especifico para esto --> */}
            <CarruselMarcas />
        </div>
    )
    }

export default Inicio