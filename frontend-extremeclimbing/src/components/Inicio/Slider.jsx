import React from 'react';
import { Carousel } from 'antd';
import './Portada.css'

const Slider = () => (
    <Carousel autoplay autoplaySpeed={3000}>
        <div>
            <img src="../../../../../public/imagenes/fotoPortada1.jpg" alt="Imagen 1" style={{ width: '100%', height: 'auto' }}/>
        </div>
        <div>
            <img src="../../../../../public/imagenes/fotoPortada2.jpg" alt="Imagen 1" style={{ width: '100%', height: 'auto' }}/>
        </div>
        <div>
            <img src="../../../../../public/imagenes/fotoPortada3.jpg" alt="Imagen 1" style={{ width: '100%', height: 'auto' }}/>
        </div>  
    </Carousel>
);
export default Slider;