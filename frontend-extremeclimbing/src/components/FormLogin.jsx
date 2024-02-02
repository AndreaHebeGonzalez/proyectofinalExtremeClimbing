import React from 'react'
import './FormRegistroLogin.css';

const FormLogin = () => {
    return (
        <section className='contenedorForm'>
            <div className="titulo">
                <h2>Accede a tu cuenta</h2>
                <div className="borde"></div>    
            </div>

            <div className="formulario">

                <div>
                    <p><span className="asterisco">*</span> Campo requerido</p>
                </div>

                <form id="login-form" action="" method="">
                    <div className="cont-error">
                        <small data-error="error-login">Email o contraseña incorrecto. Por favor vuelva a intentarlo.</small>
                    </div>

                    <div>
                        <label htmlFor="email">Email <span className="asterisco">* </span></label>
                        <div>
                            <input type="email" name="email" id="email" placeholder="Ingrese un correo"/>
                            <small id="email-error"></small>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="contraseña">Contraseña <span className="asterisco">* </span></label>
                        <div>
                            <input type="password" name="contraseña" id="contraseña" placeholder="Ingrese su contraseña"/>
                            <small id="contraseña-error"></small>
                        </div>
                        
                    </div>
                    
                    <div className="btns-register-login">
                        <button id="login-btn" type="submit">
                            <img className="iconos-respons" src="../../public/imagenes/iconos/114-user.png" alt="Icono para boton de iniciar sesión"/>
                            Iniciar sesion
                        </button>

                        <button id="crear-cuenta" formnovalidate>
                        <img className="iconos-respons" src="../../public/imagenes/iconos/116-user-plus.png" alt="Icono para boton de registrarse"/>
                        Crear cuenta
                        </button>
                    </div>
                    

                    

                </form>

                <p><a href="login.html">¿Olvidaste tu contraseña?</a></p>
            </div>
        </section>
    )
}

export default FormLogin