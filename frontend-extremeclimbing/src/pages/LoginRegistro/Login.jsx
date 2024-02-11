import React, { useEffect, useState } from 'react'
import FormLogin from '../../components/LoginRegistro/FormLogin'
import { useAuth } from '../../EstadosGlobales/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
		email:'',
        contraseña:'',
	});

    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [respuestaStatus, setRespuestaStatus] = useState(null);

    //Estado global
    const login = useAuth((state) => state.login);
    const user = useAuth((state) => state.user);

    //Para redireccionamiento:
    const navegar = useNavigate();

    useEffect(() => {
        console.log('El usuario fue logueado y sus datos son:', user);
    }, [user]);

    const handleEmail= (valor) => {
        setEmail(valor);
        setFormData({
			...formData,
			email: valor
		});
    };

    const handleContraseña= (valor) => {
        setContraseña(valor);
        setFormData({
			...formData,
			contraseña: valor
		});
    };

    const handleSubmit = async() => {
        console.log(formData)
        try {
            const respuesta = await fetch ("http://localhost:8000/usuarios/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (respuesta.ok) {
                console.log('Usuario logueado con exito', respuesta.status);
                const datosRespuesta = await respuesta.json();
                console.log(datosRespuesta.dataUsuario);
                const dataUsuario = datosRespuesta.dataUsuario;
                //Almaceno los datos de session en el estado global useAuth
                login(dataUsuario);
                //Almaceno los datos de session en el local storage para persistencia si cierra el navegador:
                localStorage.setItem('userData', JSON.stringify(dataUsuario));
                //redirijo al inicio con el logueo ya hecho: 
                navegar('/');
                
            } else {
                const datosError = await respuesta.json();
                console.error('Mensaje del servidor:', datosError.msg, respuesta.status);
                setRespuestaStatus(respuesta.status);
            }; 
        } catch (error) {
            console.error('Error:', error);
        };
    };

    return (
        <> 
            <FormLogin email={email} contraseña={contraseña} handleEmail={handleEmail} handleContraseña={handleContraseña} handleSubmit={handleSubmit} respuestaStatus={respuestaStatus} />
        </>
    )
}

export default Login