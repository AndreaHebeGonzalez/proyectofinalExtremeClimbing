import React from 'react'
import './FormRegistroLogin.css';


const Registro = () => {
    return (
        <section className='contenedorForm'>
            <div className="tituloForm">
                <h2>¿Todavía no sos cliente? Registrate</h2>
                <div className="borde"></div>    
            </div>

            <div className="formulario">
                <div>
                    <p><span className="asterisco">*</span> Campo requerido</p></div>
                <form action="" method="">
                    <div>
                        <label htmlFor="email">Email <span className="asterisco">* </span></label>
                        <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" required/>
                    </div>

                    <div>
                        <label htmlFor="nombre">Nombre <span className="asterisco">* </span></label>
                        <input type="text" name="nombre" id="nombre" placeholder="Nombre" required/>
                    </div>

                    <div>
                        <label htmlFor="apellido">Apellido<span className="asterisco">* </span></label>
                        <input type="text" name="apellido" id="apellido" placeholder="Apellido" required/>
                    </div>

                    <div>
                        <label htmlFor="fecha-de-nacimiento">Fecha de nacimiento<span className="asterisco">* </span></label>
                        <input type="number" name="fecha-de-nacimiento" id="fecha-de-nacimiento" placeholder="ddmmaa"/>
                    </div>

                    <div>
                        <label htmlFor="contraseña">Contraseña <span className="asterisco">* </span></label>
                        <input type="password" name="contraseña" id="contraseña" placeholder="Contraseña" required/>
                    </div>
                    
                    <div>
                        <label htmlFor="r_contraseña">Repita su contraseña <span className="asterisco">* </span></label>
                        <input type="password" name="r_contraseña" id="r_contraseña" placeholder="Contraseña" required/>
                    </div>
                    
                    <button id="enviar" type="submit">
                        <img className="iconos-respons" src="../../public/imagenes/iconos/registro.png" alt="icono de registrarse"/>
                        Registrarse
                    </button>

                </form>

                <p>Ya tenes cuenta? <a href="login.html">Ingresá!</a></p>
            </div>
        </section>
    )
}
    
export default Registro