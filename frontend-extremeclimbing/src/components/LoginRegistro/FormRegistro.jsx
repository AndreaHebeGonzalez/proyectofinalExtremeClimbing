import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './FormRegistroLogin.css';


const Registro = ({ nombre, apellido, nacimiento, email, contraseña, repitaContraseña, handleNombre, handleApellido, handleNacimiento, handleEmail, handleContraseña, handleRepitaContraseña, contraseñasCoinciden, contraseñaErrorUno, contraseñaErrorDos, contraseñaErrorTres, contraseñaErrorCuatro, provincia, localidad, codigoPostal, direccionNombre, direccionNumero, telefono, handleProvincia, handleLocalidad, handleCodigoPostal, handleDireccionNombre, handleDireccionNumero, handleTelefono, handleSubmit }) => {
    
    const [cambiado, setCambiado] = useState({
        nombre: false,
        apellido: false,
        nacimiento: false,
        email: false,
        contraseña: false,
        repitaContraseña: false,
        provincia: false,
        localidad: false,
        codigoPostal: false,
        direccionNombre: false,
        direccionNumero: false,
        telefono: false
    });

    const [verContraseña, setVerContraseña] = useState(false);
    const [clicInputContraseña, setClicInputContraseña] = useState(false);

    const verContraseñaToggle = () => {
        setVerContraseña(!verContraseña);
    }

    const handleClicInputContraseña = () => {
        setClicInputContraseña(true);
    }

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
                        <label htmlFor="nombre">Nombre <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input className="obligatorio" type="text" name="nombre" id="nombre" value={nombre} placeholder="Nombre" onChange={(e) => {handleNombre(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    nombre: true
                                })}}/>
                        {cambiado.nombre === true && nombre === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="apellido">Apellido<span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="text" name="apellido" id="apellido" value={apellido} placeholder="Apellido" onChange={(e) => {handleApellido(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    apellido: true
                                })}}/>
                        {cambiado.apellido === true && apellido === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fecha-de-nacimiento">Fecha de nacimiento<span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="date" name="fecha-de-nacimiento" id="fecha-de-nacimiento" value={nacimiento} onChange={(e) => {handleNacimiento(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    nacimiento: true
                                })}}/>
                            {cambiado.nacimiento === true && nacimiento === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="email" name="email" id="email" value={email} placeholder="ejemplo@gmail.com" onChange={(e) => {handleEmail(e.target.value);
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
                                <input type={verContraseña ? "text" :"password"} name="contraseña" id="contraseña" value={contraseña} placeholder="Contraseña" onClick={handleClicInputContraseña} onChange={(e) => {handleContraseña(e.target.value);
                                    setCambiado({
                                        ...cambiado,
                                        contraseña: true
                                    })}}/>
                                <img className='iconos-btn' src={verContraseña ? "../../public/imagenes/iconos/ocultar.png" :"../../public/imagenes/iconos/ver.png"} alt={verContraseña ? "Icono ocultar contraseña" :"Icono ver contraseña"} onClick={verContraseñaToggle}/>
                            </div>
                        {cambiado.contraseña === true && contraseña === '' && <small>Este campo es obligatorio</small>}
                        {clicInputContraseña && <div className='cont-validar-contraseña'>
                            {<small className='validar-contraseña'>{contraseñaErrorUno}</small>}
                            {<small className='validar-contraseña'>{contraseñaErrorDos}</small>}
                            {<small className='validar-contraseña'>{contraseñaErrorTres}</small>}
                            {<small className='validar-contraseña'>{contraseñaErrorCuatro}</small>}
                        </div>}
                        
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="r_contraseña">Repita su contraseña <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type= {verContraseña ? "text" :"password"} name="r_contraseña" id="r_contraseña" placeholder="Contraseña" onChange={(e) => {handleRepitaContraseña(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    repitaContraseña: true
                                });
                                }}/>
                            {cambiado.repitaContraseña === true && (repitaContraseña === '' || contraseñasCoinciden === false) && <small>Las contraseñas no coinciden</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="provincia">Provincia <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="text" name="provincia" id="provincia" value={provincia} placeholder="Provincia" onChange={(e) => {handleProvincia(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    provincia: true
                                })}}/>
                            {cambiado.provincia === true && provincia === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="localidad">Localidad <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="text" name="localidad" id="localidad" value={localidad} placeholder="Localidad" onChange={(e) => {handleLocalidad(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    localidad: true
                                })}}/>
                            {cambiado.localidad === true && localidad === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="codigoPostal">Codigo postal <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="number" name="codigoPostal" id="codigoPostal" value={codigoPostal} placeholder="Codigo postal" onChange={(e) => {handleCodigoPostal(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    codigoPostal: true
                                })}}/>
                            {cambiado.codigoPostal === true && codigoPostal === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="direccionNombre">Calle <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="text" name="direccionNombre" id="direccionNombre" value={direccionNombre} placeholder="Calle" onChange={(e) => {handleDireccionNombre(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    direccionNombre: true
                                })}}/>
                            {cambiado.direccionNombre === true && direccionNombre === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="direccionNumero">Número <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="number" name="direccionNumero" id="direccionNumero" value={direccionNumero} placeholder="Número" onChange={(e) => {handleDireccionNumero(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    direccionNumero: true
                                })}}/>
                            {cambiado.direccionNumero === true && direccionNumero === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="telefono">Telefono <span className="asterisco">* </span></label>
                        <div className="cont-obligatorio">
                            <input type="number" name="telefono" id="telefono" value={telefono} placeholder="Número" onChange={(e) => {handleTelefono(e.target.value);
                                setCambiado({
                                    ...cambiado,
                                    telefono: true
                                })}}/>
                            {cambiado.telefono === true && telefono === '' && <small>Este campo es obligatorio</small>}
                        </div>
                    </div>
                    
                    <button className= "boton-contenedor" id="enviar" type="submit" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} disabled = {nombre==='' || apellido==='' || nacimiento===''  || email===''|| contraseña==='' || !contraseñasCoinciden}>
                        <img className="iconos-btn" src="/public/imagenes/iconos/registro.png" alt="icono de registrarse"/>
                        Registrarse
                    </button>

                </form>

                <p>Ya tenes cuenta? <Link to="/login">Ingresá!</Link></p>
            </div>
        </section>
    )
}
    
export default Registro