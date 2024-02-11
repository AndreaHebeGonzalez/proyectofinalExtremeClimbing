import { create } from 'zustand';


export const useAbrirCarrito = create((set) =>({
    carritoAbierto: false,
    abrirCarrito() {
        set({carritoAbierto: true});
    },
    cerrarCarrito() {
        set({carritoAbierto: false})
    }
}));
