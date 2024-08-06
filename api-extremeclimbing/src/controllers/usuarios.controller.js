const { Usuarios } = require('../models/index');

const bcrypt = require('bcrypt');

const obtenerTodos = async (req, res) => { //!Funcionando
    try {
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
        
    } catch (error) {
        console.error('Hubo un error al buscar los usuarios', error);
        res.status(500).json({ msg: 'Hubo un error al buscar los usuarios', error });
    };
};

const buscarPorId = async (req, res) => {
    const idUsuario = req.session.idUsuario;
    
    try {
        const dataUsuario = await Usuarios.findByPk(idUsuario);
        if (dataUsuario) {
            res.json(dataUsuario);
        } else {
            res.status(404).json({ msg: 'El usuario no se encuentra en la base de datos' })
            return
        };
    } catch (error) {
        console.error('Error al buscar el usuario', error);
        res.status(500).json({ msg: 'Hubo un error al procesar la solicitud', error })
    };
};

const signUp = async (req, res) => { //!Funcionando
    try {
        const { nombre, apellido, nacimiento, email, contraseña, provincia, localidad, codigoPostal, direccionNombre, direccionNumero, telefono } = req.body;
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
            direccionNombre,
            direccionNumero,
            telefono
        });
        //Almaceno info no sensible que, se me ocurre, puedo requerir en la session
            req.session.idUsuario = nuevoUsuario.idUsuario;
            req.session.nombre = nuevoUsuario.nombre,
            req.session.apellido = nuevoUsuario.apellido,
            req.session.nacimiento = nuevoUsuario.nacimiento,
            req.session.email = nuevoUsuario.email
            req.session.rol = nuevoUsuario.rol;
        return res.status(201).json('Usuario logueado');
        
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
            return;
        };

        const dataUsuario = {
            id: usuario.idUsuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            nacimiento: usuario.nacimiento,
            email: usuario.email,
            rol: usuario.rol,
        };

        if(!req.session.idUsuario) { 
            req.session.idUsuario = usuario.idUsuario;
            req.session.nombre = usuario.nombre,
            req.session.apellido = usuario.apellido,
            req.session.nacimiento = usuario.nacimiento,
            req.session.email = usuario.email
            req.session.rol = usuario.rol;

            console.log(req.session.idUsuario);
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

const verificarSesion = async (req, res) => { 
    if (req.session.idUsuario) {
        const dataUsuario = {
            nombre: req.session.nombre,
            apellido: req.session.apellido,
            nacimiento: req.session.nacimiento,
            email: req.session.email,
            rol: req.session.rol,
        };
        res.json({ msg: 'Usuario autenticado', dataUsuario });
    } else {
        res.status(401).json({ msg: 'Usuario no autenticado' });
    };
};

//!CREAR CONTROLADOR PARA RECUPERACION DE CONTRASEÑA


module.exports = {
    obtenerTodos,
    buscarPorId,
    signUp,
    signIn,
    signOut,
    actualizarEmail,
    actualizarContraseña,
    borrarUsuario,
    verificarSesion
};
