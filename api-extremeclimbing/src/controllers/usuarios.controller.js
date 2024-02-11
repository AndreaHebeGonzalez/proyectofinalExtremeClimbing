//Importo modelos a usar en este modulo:
const { Usuarios } = require('../models/index');

//Requiero bcrypt:
const bcrypt = require('bcrypt');

//Creo los controladores de rutas

//Obtener todos los usuarios:

const obtenerTodos = async (req, res) => { //!Funcionando
    try {
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
        
    } catch (error) {
        console.error('Hubo un error al buscar los usuarios', error);
        res.status(500).json({ msg: 'Hubo un error al buscar los usuarios', error });
    };
};


const signUp = async (req, res) => { //!Funcionando
    try {
        const { nombre, apellido, nacimiento, email, contraseña, provincia, localidad, codigoPostal, nombreCalle, numeroCalle, telefono } = req.body;
        console.log(nacimiento);
        const nuevoUsuario = await Usuarios.create({
            nombre,
            apellido,
            nacimiento,
            email,
            contraseña,
            provincia,
            localidad,
            codigoPostal,
            nombreCalle,
            numeroCalle,
            telefono
        });
        //Almaceno info no sensible que, se me ocurre, puedo requerir en la session
        req.session.idUsuario = nuevoUsuario.idUsuario;
        req.session.email = nuevoUsuario.email;
        req.session.rol = nuevoUsuario.rol;
        return res.status(201).json('Usuario logueado');
        //201 se utiliza para indicar que una solicitud ha sido exitosa y ha llevado a la creación de un nuevo recurso en el servidor. 
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        console.error('Se ha producido un error, el usuario no ha podido registrarse', error);
        return res.status(500).json({msg:'Se ha producido un error, el usuario no ha podido registrarse', error})
    };
};

const signIn = async (req, res) => { //!Funcionando
    const { email, contraseña } = req.body;
    try {
        const usuario = await Usuarios.findOne({
            where: { email, }
        });
        if (!usuario) {
            console.log('usuario no econtrado');
            res.status(401).json({ msg: 'Email o contraseña incorrectos' });
            return;
        };
        const resultado = await bcrypt.compare(contraseña, usuario.contraseña);
        if(!resultado) {
            res.status(401).json({ msg: 'Email o contraseña incorrectos' });
            //En el contexto de un sistema de autenticación, como un sistema de inicio de sesión, este código se puede utilizar para indicar que las credenciales proporcionadas por el usuario (por ejemplo, nombre de usuario y contraseña) no son válidas o no son suficientes para acceder al recurso solicitado.
            return;
        };

        const dataUsuario = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            nacimiento: usuario.nacimiento,
            email: usuario.email,
            rol: usuario.rol,
        };

        if(!req.session.idUsuario) {
            req.session.idUsuario = usuario.idUsuario;
            req.session.email = usuario.email
            req.session.rol = usuario.rol;
        };

        res.status(200).json({ msg: 'Se ha iniciado sesion exitosamente', dataUsuario });
    } catch (error) {
        console.error('Hubo un error durante el inicio de sesion', error);
        res.status(500).json({ msg: 'Hubo un error al procesar la solicitud', error });
    };
}; 

const signOut = (req, res) => { //!Funcionando
    req.session.destroy((error) => {
        if (error) {
            console.error('Error al cerrar sesion');
            res.status(500).json({ msg: 'Error al cerrar sesion', error });
        } else {
            res.status(200).json({ msg: 'Sesion cerrada con exito' });
        };
    });
};

const actualizarEmail = async (req, res) => { //!Funcionando
    const idUsuario = req.session.idUsuario;
    const nuevoEmail = req.body.email;
    try {
        const usuario = await Usuarios.findByPk(idUsuario);
        if (usuario) {
            await Usuarios.update({
                email: nuevoEmail,
            }, {
                where: { idUsuario },
            }); 
            const usuarioActualizado = await Usuarios.findOne({
                where: {email: nuevoEmail}
            });
            if(usuarioActualizado) {
                req.session.email = usuarioActualizado.email;    
                console.log(req.session.email);
            };
            res.status(200).json({
                msg: 'Email actualizado correctamente',
                email: req.session.email
            });  
        } else {
            res.status(404).json('Usuario no encontrado');
        };
    } catch (error) {
        console.error('Error al actualizar el email', error);
        res.status(500).json({ msg: 'Error al actualizar el email', error });
    };
};

const actualizarContraseña = async (req, res) => { //!Funcionando
    const idUsuario = req.session.idUsuario;
    const nuevaContraseña = req.body.contraseña;
    try {
        const usuario = await Usuarios.findByPk(idUsuario);
        if (usuario) {
            await Usuarios.update({
                contraseña: nuevaContraseña,
            }, {
                where: { idUsuario }
            }); 
            if (req.session.idUsuario) {
                console.log(req.session);
                req.session.destroy((error) => {
                    if (error) {
                        console.error('Error al cerrar sesion');
                        res.status(500).json({ msg: 'Error al cerrar sesion', error });
                        return;
                    } else {
                        console.log('Sesion cerrada exitosamente');
                    };
                });
            };
            res.status(200).json({
                msg: 'Contraseña actualizada correctamente, vuelva a iniciar sesion',
            });  
        } else {
            res.status(404).json('Usuario no encontrado');
        };
    } catch(error) {
        console.error('Error al actualizar el email', error);
        res.status(500).json({ msg: 'Error al actualizar el email', error });
    };
};

const borrarUsuario = async (req, res) => { //!Funcionando
    const idUsuario =  req.session.idUsuario;
    try {
        const usuario = await Usuarios.findByPk(idUsuario);
        if(usuario) {
            const { confirmacion } = req.body; //Enviar la confirmacion con la solicitud desde el front
            if(confirmacion === true) {
                
                if(req.session.idUsuario) {
                    console.log(req.session);
                    req.session.destroy((error) => {
                        if (error) {
                            console.error('Error al cerrar sesion');
                            res.status(500).json({ msg: 'Error al cerrar sesion', error });
                            return;
                        } else {
                            console.log('Sesion cerrada exitosamente');
                        };
                    });
                };
                await Usuarios.destroy({
                    where: { idUsuario }
                });
                res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
            } else {
                res.status(400).json({ msg: 'Se requiere confirmacion' }); //Error de solicitud
            };
        } else {
            res.status(404).json({ msg: 'Usuario no encontrado' });
        };
    } catch(error) {
        console.error('Error al borrar el usuario', error);
        res.status(500).json({ msg: 'Error al borrar el usuario', error });
    };
};

//!CREAR CONTROLADOR PARA RECUPERACION DE CONTRASEÑA


module.exports = {
    obtenerTodos,
    signUp,
    signIn,
    signOut,
    actualizarEmail,
    actualizarContraseña,
    borrarUsuario
};


/*
Agregar una confirmación antes de eliminar el usuario, ya que esta es una operación crítica:

Confirmacion en el frontend de borrado de usuario para boton de arrepentimiento

async function confirmarYEliminarUsuario() {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');

    if (confirmacion) {
        try {
            const response = await fetch('/ruta-para-eliminar-usuario', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmacion: true }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
            } else {
                throw new Error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
        }
    } else {
        console.log('Eliminación cancelada');
    }
}

// Llama a la función para confirmar y eliminar el usuario
confirmarYEliminarUsuario();

En el backend controlador para borrar usuario incluye una capa de confirmacion de eliminacion de usuario: 


const borrarUsuario = async (req, res) => {
    const idUsuario = req.session.idUsuario;
    try {
        const usuario = await Usuarios.findByPk(idUsuario);
        
        if(usuario) {
            // Pregunta de confirmación
            // Puedes personalizar el manejo de confirmación según tus necesidades
            const confirmacion = req.body.confirmacion;
            
            if (confirmacion === true) {
                // Elimina el usuario usando destroy() con el criterio de búsqueda
                await Usuarios.destroy({
                    where: { idUsuario: idUsuario }
                });

                // Devuelve una respuesta exitosa
                res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
            } else {
                // Devuelve un mensaje de confirmación necesario
                res.status(400).json({ msg: 'Se requiere confirmación para eliminar el usuario' });
            }
        } else {
            // Devuelve un mensaje si el usuario no se encuentra
            res.status(404).json({ msg: 'Usuario no encontrado' });
        }
    } catch(error) {
        // Maneja los errores correctamente
        console.error('Error al borrar el usuario', error);
        res.status(500).json({ msg: 'Error al borrar el usuario', error });
    }
};

Comentario sobre esta doble capa de confirmacion, por un lado se confirma mendiante una ventana en la interfaz de usuario la eliminacion, y por otro lado dicha confirmacion se envial en la request del body al back. Esto permite lo siguiente: 


La confirmación en el frontend (confirmación === true) se utiliza para proporcionar una capa adicional de interactividad y comodidad para el usuario antes de realizar la solicitud para eliminar el usuario. Sin embargo, como mencionaste, esta confirmación podría ser manipulada en el lado del cliente, por lo que no debes confiar completamente en ella para la seguridad.

La confirmación en el backend es una medida de seguridad adicional. Al realizar la confirmación en el backend, te aseguras de que la solicitud solo se procesará si el servidor también verifica la confirmación. Esto es útil para prevenir posibles ataques o manipulaciones en el lado del cliente.

if (confirmacion === true) {
    // Elimina el usuario usando destroy() con el criterio de búsqueda
    await Usuarios.destroy({
        where: { idUsuario: idUsuario }
    });

    // Devuelve una respuesta exitosa
    res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
} else {
    // Devuelve un mensaje de confirmación necesario
    res.status(400).json({ msg: 'Se requiere confirmación para eliminar el usuario' });
}

Aquí, si la confirmación es true, se procede a eliminar el usuario. Si la confirmación no es true, se responde con un código de estado 400 y un mensaje indicando que se requiere confirmación para eliminar el usuario. Esto garantiza que el servidor valide la confirmación antes de realizar cualquier acción crítica.

El código de estado HTTP 400 significa "Bad Request" (Solicitud Incorrecta). Este código se utiliza para indicar que el servidor no pudo entender o procesar la solicitud del cliente debido a un error en la solicitud.
*/