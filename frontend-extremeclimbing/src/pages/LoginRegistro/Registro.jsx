import React, { useEffect, useState } from 'react'
import FormRegistro from '../../components/LoginRegistro/FormRegistro';
import VentanaModal from '../../components/VentanaModal/VentanaModal';
import passwordValidator from 'password-validator';
import { useAuth } from '../../EstadosGlobales/useAuth';
import { useNavigate } from 'react-router-dom';

const Registro = () => {


    const [formData, setFormData] = useState({
		nombre:'',
        apellido:'',
        nacimiento:'',
        email:'',
        contraseña:'',
        provincia:'',
        localidad: '',
        codigoPostal: '',
        direccionNombre: '',
        direccionNumero: '',
        telefono:'',
	});

    //campos obligatorios
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [nacimiento, setNacimiento] = useState('');
	const [email, setEmail] = useState('');
	const [contraseña, setContraseña] = useState('');
    const [contraseñaErrorUno, setContraseñaErrorUno] = useState('');
    const [contraseñaErrorDos, setContraseñaErrorDos] = useState('');
    const [contraseñaErrorTres, setContraseñaErrorTres] = useState('');
    const [contraseñaErrorCuatro, setContraseñaErrorCuatro] = useState('');
    const [repitaContraseña, setRepitaContraseña] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [direccionNombre, setDireccionNombre] = useState('');
    const [direccionNumero, setDireccionNumero] = useState('');
    const [telefono, setTelefono] = useState('');

    const[contraseñasCoinciden, setContraseñasCoinciden] = useState(false);

    //Estado global
    const login = useAuth((state) => state.login);

    //Para redireccionamiento:
    const navegar = useNavigate();

    //Maneja ventana modal
    const [formEnviado, setFormEnviado] = useState(false);

    //Manejadores para evento onChange

    const handleNombre = (valor) => {
		setNombre(valor);
        setFormData({
			...formData,
			nombre: valor
		});
	};

    const handleApellido = (valor) => {
		setApellido(valor);
        setFormData({
			...formData,
			apellido: valor
		});
	};

    const handleNacimiento = (valor) => {
		setNacimiento(valor);
        setFormData({
			...formData,
			nacimiento: valor
		});
	};

    const handleEmail = (valor) => {
		setEmail(valor);
        setFormData({
			...formData,
			email: valor
		});
	};

    const handleContraseña= (valor) => {
		setContraseña(valor);
	};

    const validarContraseña = () => {
        const requisitos = new passwordValidator();

        requisitos
        .is().min(8)             
        .has().uppercase()       
        .has().lowercase()
        .has().digits(1) 

        if (requisitos.validate(contraseña)) {
            setContraseñaErrorUno('');
            setContraseñaErrorDos('');
            setContraseñaErrorTres('');
            setContraseñaErrorCuatro('');
        } else {
            setContraseñaErrorUno('Mínimo 8 caracteres');
            setContraseñaErrorDos('Una letra mayúscula');
            setContraseñaErrorTres('Una letra minúscula');
            setContraseñaErrorCuatro('Un número');
        };
    };

    const handleRepitaContraseña = (valor) => {
		setRepitaContraseña(valor);
	};

    const handleContraseñasCoinciden = () => {
        console.log(contraseña, repitaContraseña)
        if(contraseña === repitaContraseña) { 
            setContraseñasCoinciden(true);
        } else {
            setContraseñasCoinciden(false);
        };
    };

    const handleProvincia = (valor) => {
		setProvincia(valor);
        setFormData({
			...formData,
			provincia: valor
		});
	};

    const handleLocalidad = (valor) => {
		setLocalidad(valor);
        setFormData({
			...formData,
			localidad: valor
		});
	};

    const handleCodigoPostal = (valor) => {
		setCodigoPostal(valor.toString());
        setFormData({
			...formData,
			codigoPostal: valor
		});
	};

    const handleDireccionNombre = (valor) => {
		setDireccionNombre(valor);
        setFormData({
			...formData,
			direccionNombre: valor
		});
	};

    const handleDireccionNumero = (valor) => {
		setDireccionNumero(valor.toString());
        setFormData({
			...formData,
			direccionNumero: valor
		});
	};

    const handleTelefono = (valor) => {
		setTelefono(valor.toString());
        setFormData({
			...formData,
			telefono: valor
		});
	};

    useEffect(() => {
        validarContraseña();
    }, [contraseña]);

    useEffect(() => {
        handleContraseñasCoinciden();
    }, [repitaContraseña]);

    const handleSubmit = async () => {
    
        //Cargo contraseña al objeto formData
        setFormData({
            ...formData,
            contraseña: contraseña
        });

        //Limpio el objeto a enviar:
        const formDataLimpio = formData;
        console.log(formDataLimpio);
        for (const key in formDataLimpio) {
            if (formDataLimpio.hasOwnProperty(key)) { //Pregunto si el object tiene esa clave:
                const valor = formDataLimpio[key];
                formDataLimpio[key] = valor.trim();
            };
        };
        for (const key in formDataLimpio) {
            if (
                (formDataLimpio[key] === '') &&
                formDataLimpio.hasOwnProperty(key)
            ) {
                delete formDataLimpio[key];
            };
        };
        console.log(formDataLimpio);
        try {
            const respuesta = await fetch ("http://localhost:8000/usuarios", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formDataLimpio)
            });

            if (respuesta.ok) {
                try {
                    const formData = {
                        email: formDataLimpio.email,
                        contraseña: formDataLimpio.contraseña
                    };
                    const respuestaLogin = await fetch ("http://localhost:8000/usuarios/signin", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    if(respuestaLogin.ok) {
                        console.log('Usuario logueado con exito', respuesta.status);
                        const datosRespuesta = await respuestaLogin.json();
                        console.log(datosRespuesta.dataUsuario);
                        const dataUsuario = datosRespuesta.dataUsuario;
                        //Almaceno los datos de session en el estado global useAuth
                        login(dataUsuario);
                        //Almaceno los datos de session en el local storage para persistencia si cierra el navegador:
                        localStorage.setItem('userData', JSON.stringify(dataUsuario));
                        //redirijo al inicio con el logueo ya hecho: 
                        navegar('/');
                    } else {

                    };
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                /*Manejar error de email repetido o usuario ya registrado*/
                console.error('Error al enviar el formulario. Código de estado:', respuesta.status);
            }; 
        } catch (error) {
            ('Error:', error);
        };
};


    return (
        <>
            <FormRegistro nombre={nombre} apellido={apellido} nacimiento={nacimiento} email={email} contraseña={contraseña} repitaContraseña={repitaContraseña} handleNombre={handleNombre} handleApellido={handleApellido} handleNacimiento={handleNacimiento} handleEmail={handleEmail} handleContraseña={handleContraseña} handleRepitaContraseña={handleRepitaContraseña} contraseñasCoinciden={contraseñasCoinciden}  contraseñaErrorUno= {contraseñaErrorUno} contraseñaErrorDos={contraseñaErrorDos} contraseñaErrorTres={contraseñaErrorTres} contraseñaErrorCuatro={contraseñaErrorCuatro} provincia={provincia} localidad={localidad} codigoPostal={codigoPostal} direccionNombre={direccionNombre} direccionNumero={direccionNumero} telefono={telefono} handleProvincia={handleProvincia} handleLocalidad={handleLocalidad} handleCodigoPostal={handleCodigoPostal} handleDireccionNombre={handleDireccionNombre} handleDireccionNumero={handleDireccionNumero} handleTelefono={handleTelefono} handleSubmit={handleSubmit} />

            <VentanaModal respuesta = "Formulario enviado!" formEnviado={formEnviado} setFormEnviado={setFormEnviado} />
        </>
    )
}

export default Registro