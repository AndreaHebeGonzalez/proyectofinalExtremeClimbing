import React, { useEffect, useState } from 'react'
import FormRegistro from '../../components/LoginRegistro/FormRegistro';
import VentanaModal from '../../components/VentanaModal/VentanaModal';
import passwordValidator from 'password-validator';

const Registro = () => {


    const [formData, setFormData] = useState({
		nombre:'',
        apellido:'',
        nacimiento:'',
        email:'',
        contraseña:'',
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

    const[contraseñasCoinciden, setContraseñasCoinciden] = useState(false);

    

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
                setTimeout(() => {
                    setFormEnviado(true);
                    //loguear usuario en el front
                }, 1000);
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
            <FormRegistro nombre={nombre} apellido={apellido} nacimiento={nacimiento} email={email} contraseña={contraseña} repitaContraseña={repitaContraseña} handleNombre={handleNombre} handleApellido={handleApellido} handleNacimiento={handleNacimiento} handleEmail={handleEmail} handleContraseña={handleContraseña} handleRepitaContraseña={handleRepitaContraseña} contraseñasCoinciden={contraseñasCoinciden}  contraseñaErrorUno= {contraseñaErrorUno} contraseñaErrorDos={contraseñaErrorDos} contraseñaErrorTres={contraseñaErrorTres} contraseñaErrorCuatro={contraseñaErrorCuatro} handleSubmit={handleSubmit} />

            <VentanaModal respuesta = "Formulario enviado!" formEnviado={formEnviado} setFormEnviado={setFormEnviado} />
        </>
    )
}

export default Registro