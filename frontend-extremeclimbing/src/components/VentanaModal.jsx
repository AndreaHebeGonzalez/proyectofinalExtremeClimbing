import React from "react"; 
import './VentanaModal.css';

const VentanaModal = ({ respuesta, envioForm, setEnvioForm }) => {

    const claseBase = 'ventana-modal';
    
    return (
        <section className={`${claseBase} ${envioForm ? 'mostrar-ventana-modal' : ''}`}>
            <div className="contenedor-ventana-modal">
                <div></div>
                <h2 className="titulo-ventana-modal h2forms">{respuesta}</h2>
                <button id="agregar-producto-btn" type="button" onClick={() => {
                    setEnvioForm(false);
                    window.location.reload();
                    }}>
                    Aceptar
                </button> 
            </div>
        </section>
    )
}
export default VentanaModal;