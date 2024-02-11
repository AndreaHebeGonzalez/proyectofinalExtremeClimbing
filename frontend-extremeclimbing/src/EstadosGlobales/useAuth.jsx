import { create } from 'zustand';

export const useAuth = create((set) => ({
    user: null,
    isLogin: false,
    login(dataUsuario) {
        set({user: dataUsuario, isLogin: true});
    },
    logout() {
        set({user:null, isLogin:false});
    },
}));