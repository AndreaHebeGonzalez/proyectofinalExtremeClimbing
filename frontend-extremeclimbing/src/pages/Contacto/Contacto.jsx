import React from 'react'
import '../../components/LoginRegistro/FormRegistroLogin.css';

const Contacto = () => {
    return (
        <section className='contenedorForm'>
                <div className="titulo">
                    <h2>Contactanos</h2>
                    <div className="borde"></div>    
                </div>

                <div className="formulario">

                    <div>
                        <p><span className="asterisco">*</span> Campo requerido</p>
                    </div>

                    <form id="login-form" action="" method="">

                        <div>
                            <label htmlFor="email">Email <span className="asterisco">* </span></label>
                            <div className="cont-obligatorio">
                                <input type="email" name="email" id="email" placeholder="Ingrese un correo"/>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="contraseña">Contraseña <span className="asterisco">* </span></label>
                            
                            <textarea id="mensaje" name="mensaje" rows="4" cols="50"></textarea>
                        </div>
                        
                        <div className="btns-register-login">
                            <button className= "boton-contenedor" id="login-btn" type="submit" onClick={(e) => {
                            e.preventDefault();
                        }} disabled>
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
    )
}

export default Contacto