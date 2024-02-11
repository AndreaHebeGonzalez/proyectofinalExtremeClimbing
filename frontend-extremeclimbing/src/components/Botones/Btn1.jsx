import React from 'react'
import './Btn1.css'

const Btn1 = ({ accion }) => {
    return (
        <button className="btn-1">
            {accion}
        </button>    
    )
}

export default Btn1