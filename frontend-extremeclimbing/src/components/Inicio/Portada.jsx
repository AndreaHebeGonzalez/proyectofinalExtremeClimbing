import React from 'react';
import './Portada.css';
import Btn1 from '../Botones/Btn1';

const Portada = () => {
    return (
        <> 
            <section id="portada" className= "fondoPages">
                <div>
                    <img className="img-1" src="../../public/imagenes/portada-img_1.jpg" alt="Imagen de portada persona escalando" width="100%" height="auto"/>
                </div>

                
                <img className="img-propaganda" src="../../public/imagenes/La-sportiva.png" alt="Logo marca La Sportiva"/>
                

                <Btn1 accion = {'Comprar'} />
            </section>
        </>
    )
}

export default Portada