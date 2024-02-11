import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './FormRegistroLogin.css';

const FormLogin = ({ email, contraseña, handleEmail, handleContraseña, handleSubmit, respuestaStatus }) => {

    const [cambiado, setCambiado] = useState({
        email: false,
        contraseña: false,
    });

    const [verContraseña, setVerContraseña] = useState(false);

    const verContraseñaToggle = () => {
        setVerContraseña(!verContraseña);
    }

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
                    {respuestaStatus == 401 && <div className="cont-error">
                        <small data-error="error-login">Email o contraseña incorrecto. Por favor vuelva a intentarlo.</small>
                    </div>}

                    <div>
                        <label htmlFor="email">Email <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="email" name="email" id="email" value={email} placeholder="Ingrese un correo"onChange={(e) => {handleEmail(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    email: true
                                })}}/>
                            {cambiado.email === true && email === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>


                    <div>
                        <label htmlFor="contraseña">Contraseña <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                        <div className='cont-input-eyes'>
                                <input type={verContraseña ? "text" :"password"} name="contraseña" id="contraseña" value={contraseña} placeholder="Contraseña" onChange={(e) => {handleContraseña(e.target.value);
                                    setCambiado({
                                        ...cambiado,
                                        contraseña: true
                                    })}}/>
                                <img className='iconos-btn' src={verContraseña ? "../../public/imagenes/iconos/ocultar.png" :"../../public/imagenes/iconos/ver.png"} alt={verContraseña ? "Icono ocultar contraseña" :"Icono ver contraseña"} onClick={verContraseñaToggle}/>
                            </div>
                        {cambiado.contraseña === true && contraseña === '' && <small>Este campo es obligatorio</small>}
                        </div>
                        
                    </div>
                    
                    <div className="btns-register-login">
                        <button className= "boton-contenedor" id="login-btn" type="submit" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} disabled = {email===''|| contraseña===''}>
                            <img className="iconos-btn" src="../../public/imagenes/iconos/114-user.png" alt="Icono para boton de iniciar sesión"/>
                            Iniciar sesion
                        </button>
                        <Link to="/registro">
                            <button className= "boton-contenedor" id="crear-cuenta" formNoValidate>
                            <img className="iconos-btn" src="../../public/imagenes/iconos/116-user-plus.png" alt="Icono para boton de registrarse"/>
                            Crear cuenta
                            </button>
                        </Link>
                    </div>
                </form>

                <p><Link to="#">¿Olvidaste tu contraseña?</Link></p>
            </div>
        </section>
    )
}

export default FormLogin