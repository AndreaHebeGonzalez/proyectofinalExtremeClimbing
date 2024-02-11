import { create } from "zustand"; 

export const useCarrito = create((set) => ({
    productosCarrito: [],
    agregarProducto: (producto) => 
        set(({productosCarrito}) => ({productosCarrito: [...productosCarrito, producto ]})),
    eliminarProducto: (index) => 
        set(({productosCarrito}) => {
            const filtrarProductos = productosCarrito.filter((p, i) => i !== index);
            return { productosCarrito: filtrarProductos };
        }),
    actualizarCarrito: (nuevosProductos) => 
        set({productosCarrito: nuevosProductos})
}));

