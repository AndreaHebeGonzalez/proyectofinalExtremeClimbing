import React from 'react'
import { Drawer, Space, Button } from 'antd';

const Carrito = () => {
    const hundleCompra = () => {
        console.log('Compra realizada')
    }
    return (
        <Drawer
            title="Tu carrito"
            width={500}
           /*  onClose={onClose} */
            open = {false}
            extra={        
                <Button type="primary" onClick={hundleCompra}>
                Procesar compra
                </Button>
            }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    )
}

export default Carrito