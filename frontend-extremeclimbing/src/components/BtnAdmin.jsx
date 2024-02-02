import React from 'react'
import './BtnAdmin.css'

const BtnAdmin = ({ operacion }) => {
    return (
        <button id="admin" className='btn-admin'>
            {operacion}
        </button>
    )
}

export default BtnAdmin