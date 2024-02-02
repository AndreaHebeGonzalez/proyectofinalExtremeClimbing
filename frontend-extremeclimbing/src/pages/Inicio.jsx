import React from 'react'
import Portada from '../components/Portada'
import './Inicio.css'
import CarruselMarcas from '../components/CarruselMarcas'
import Banner1 from '../components/Banner1'
import CarruselDestacados from '../components/CarruselDestacados'

const Inicio = () => {
    return (
        <div className="fondoPages">  
            <Portada />
            {/* <!-- Fin Portada --> */}

            {/* <!-- Seccion categorias --> */}
            <section id="categorias" className="contenedor">
                <div className="cat-1">
                    <h2>Escalada</h2>
                    <img  src=" ../../public/imagenes/Escalada.jpg" alt="Imágen categoria escalada" width="100%" height="auto"/>
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
            <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' }}>
                <CarruselDestacados titulo= {'Extreme Climbing'} />
            </div>
            

            {/* <!-- Seccion bunner --> */}
            <Banner1 />
            {/* <!-- FIN Seccion bunner --> */}

            {/* <!-- Seccion carrousel de marcas, solo css, me funcionó triplicando la cantidad de imágenes, cree un css especifico para esto --> */}
            <CarruselMarcas />
        </div>
    )
    }

export default Inicio