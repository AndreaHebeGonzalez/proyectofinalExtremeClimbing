import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormularioActualizar from '../../components/Administracion/FormularioActualizar';
import VentanaModal from '../../components/VentanaModal/VentanaModal';


const ModificarProducto = () => {
	const [productoAdmin, setProductoAdmin] = useState([]);
	const [caract, setCaract] = useState([{ id: 1, valor: '' }]);
	const { id } = useParams();

	const [formData, setFormData] = useState({
		nombre:'',
        marca:'',
        precio:'',
        cantidad:'',
        categoria:'',
        subcategoriaUno: '',
        subcategoriaDos: '',
        subcategoriaTres: '',
        descripcion:'',
        caracteristicas: [],
        infoTecnica: [] 
	});

	//campos obligatorios
	const [nombre, setNombre] = useState('');
	const [marca, setMarca] = useState('');
	const [precio, setPrecio] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [categoria, setCategoria] = useState('');
	//No obligatorio
	const [descripcion, setDescripcion] = useState('');


	//Manejar ventana modal
	const [formEnviado, setFormEnviado] = useState(false);

	useEffect(() => {
        const soliFetch = async () => {
            try {
                const respuesta = await fetch(`http://localhost:8000/productos/${id}`);
                if (!respuesta) {
                    console.log('Error al solicitar producto');
                    return 
                };
                const data = await respuesta.json();
                setProductoAdmin(data);
            } catch (error) {
                console.error('Error al solicitar los productos', error);
            };
        };
        soliFetch();
    }, []);

	const agregarCaracteristica = () => {
		setCaract((prevCaract) => [
			...prevCaract,
			{ id: prevCaract.length + 1, valor: '' },
		]);
	};

	const quitarCaracteristica = (id) => {
		setCaract((prevCaract) =>
			prevCaract.filter((caracteristica) => caracteristica.id !== id)
		);
	};

	const handleModificaCaracteristica = (id, valor) => {
		console.log(id, valor)
		console.log(formData.caracteristicas[0])
		setCaract((prevCaract) =>
			prevCaract.map((caracteristica) =>
				caracteristica.id === id ? { ...caracteristica, valor } : caracteristica)
		);

		setFormData((prevFormData) => {
			if (prevFormData.caracteristicas[id-1] !== undefined) {
				prevFormData.caracteristicas[id-1] = valor;
			} else {
				prevFormData.caracteristicas.push(valor);
			}
			return { ...prevFormData }
		});
	};
	

	const handleNombre = (valor) => {
		setNombre(valor);
		setFormData({
			...formData,
			nombre: valor
		});
	};
	
	const handleMarca = (valor) => {
		setMarca(valor);
		setFormData({
			...formData,
			marca: valor
		});
	};

	const handlePrecio = (valor) => {
		setPrecio(valor);
		setFormData({
			...formData,
			precio: valor
		});
	};

	const handleCantidad = (valor) => {
		setCantidad(valor);
		setFormData({
			...formData,
			cantidad: valor
		});
	};

	const handleCategoria = (valor) => {
		setCategoria(valor);
		setFormData({
			...formData,
			categoria: valor
		});
	};

	const handleDescripcion = (valor) => {
		setDescripcion(valor);
		setFormData({
			...formData,
			descripcion: valor
		});
	};


	const handleSubmit = async () => {
		//Limpio el objeto a enviar:
		const formDataLimpio = formData;
		console.log(formDataLimpio);
		for (const key in formDataLimpio) {
			if (formDataLimpio.hasOwnProperty(key)) { //Pregunto si el object tiene esa clave:
				const valor = formDataLimpio[key];
				if(Array.isArray(valor)) { 
					//Es ncesario preguntar si es un string?
					valor.map((elemento) => {
						return elemento.trim();
					}).filter((e => e !== ''));
					formDataLimpio[key] = valor;
				} else {
					formDataLimpio[key] = valor.trim();
				};
			};
		};
		for (const key in formDataLimpio) {
			if (
				(formDataLimpio[key] === '' || (Array.isArray(formDataLimpio[key]) && formDataLimpio[key].length === 0)) &&
				formDataLimpio.hasOwnProperty(key)
			) {
				delete formDataLimpio[key];
			};
		};
		console.log(formDataLimpio);

		const formDataConArchivos = new FormData(); //Instancia de FormData();

		Object.entries(formDataLimpio).forEach(([clave, valor]) => {
			if (Array.isArray(valor)) {
				valor.forEach((elemento, index) => {
					formDataConArchivos.append(`${clave}${[index]}`, elemento)
				});
			} else {
				formDataConArchivos.append(clave, valor);
			};
		});
		const inputImagenes = document.getElementById('imagenes'); 
		const archivos = inputImagenes.files;

		for (let i = 0; i < archivos.length; i++) {
			formDataConArchivos.append('imagenes', archivos[i]);
		};
		try {
			const respuesta = await fetch (`http://localhost:8000/productos/${id}`, {
				method: 'PUT',
				body: formDataConArchivos
			});
			if (respuesta.ok) {
                setTimeout(() => {
					setFormEnviado(true);
				}, 1000);
            } else {
                console.error('Error al enviar el formulario. Código de estado:', respuesta.status);
            };
		} catch (error) {
			('Error:', error);
		};
		setTimeout(() => {
			setEnvioForm(true);
		}, 1000)
	};

	return (
		<section className='contenedor-admin'>
			<div className="titulo">
				<h2>Modificar Producto</h2>
				<div className="borde"></div>    
			</div>

			<FormularioActualizar productoAdmin={productoAdmin} caract={caract} agregarCaracteristica={agregarCaracteristica} quitarCaracteristica={quitarCaracteristica} handleModificaCaracteristica={handleModificaCaracteristica} nombre={nombre} marca={marca} precio={precio} cantidad={cantidad} categoria={categoria} descripcion={descripcion} handleNombre={handleNombre} handleMarca={handleMarca} handlePrecio={handlePrecio} handleCantidad={handleCantidad} handleCategoria= {handleCategoria} handleDescripcion={handleDescripcion} handleSubmit={handleSubmit} />
			
			<VentanaModal respuesta = "Producto actualizado!" formEnviado={formEnviado} setFormEnviado={setFormEnviado} />
		</section>

		
	)
}

export default ModificarProducto