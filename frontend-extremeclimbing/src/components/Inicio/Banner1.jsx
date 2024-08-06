import React from 'react'
import './Banner1.css'

const Banner1 = () => {
    return (
        <section className="banner_1">
            <div className="contenedor_banner">
                <div className="img-bunner-1">
                    <img src="/public/imagenes/img-banner-1.jpg" alt="Imagen de banner persona haciendo trekking"/>
                </div>

                <div className="img-bunner-2">
                    <div className="texto-banner">
                        <div>
                            <h3>Todo</h3>
                            <span className="destacado-2">30%</span>
                        </div>
                        
                        <h3><span className="destacado">Trekking</span> off</h3>
                        
                    </div>
                    <img src="/public/imagenes/img-banner-2.jpg" alt="Imagen de banner persona haciendo trekking"/>
                </div>

                <div className="img-bunner-3"> 
                    <img src="/public/imagenes/img-banner-3.jpg" alt="Imagen de banner persona haciendo trekking"/>
                </div>
                
                <div className="img-bunner-4">
                    <img src="/public/imagenes/img-banner-4.jpg" alt="Imagen de banner persona haciendo trekking"/>
                </div>
            </div>
        </section>
    )
}

export default Banner1