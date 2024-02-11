import React from 'react'
import { Link } from 'react-router-dom';
import BtnAdmin from '../../components/Botones/BtnAdmin'
import './Administracion.css'

const Administracion = () => {
    return (
        <section className='contenedor-admin'>
            <div className="titulo">
                <h2>Área administrador</h2>
                <div className="borde"></div>    
            </div>


            <div className='contenedor-btn'>
                <Link to="/productos-admin">
                    <BtnAdmin operacion= "Lista de productos" />
                </Link>
                <Link to="/agregar-producto">
                    <BtnAdmin operacion= "Agregar nuevo producto" />
                </Link>
            </div>

        </section>
    )
}

export default Administracion