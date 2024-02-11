import React from "react"; 
import './VentanaModal.css';

const VentanaModal = ({ respuesta, formEnviado, setFormEnviado }) => {

    const claseBase = 'ventana-modal';
    
    return (
        <section className={`${claseBase} ${formEnviado ? 'mostrar-ventana-modal' : ''}`}>
            <div className="contenedor-ventana-modal">
                <div></div>
                <h3 className="titulo-ventana-modal">{respuesta}</h3>
                <button id="agregar-producto-btn" type="button" onClick={() => {
                    setFormEnviado(false);
                    window.location.reload();
                    }}>
                    Aceptar
                </button> 
            </div>
        </section>
    )
}
export default VentanaModal;