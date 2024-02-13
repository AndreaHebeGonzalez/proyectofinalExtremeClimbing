const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (bd) => {
    const Usuarios = bd.define ('Usuarios', {
        idUsuario: {
            type: DataTypes.INTEGER,
            field: 'id_usuario',
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false, 
            unique: true,
            validate: {
                isInt: {
                    args: [0], //se especifica un rango con el limite inferior
                    msg: 'El valor de idUsuario debe ser un número entero positivo.',
                },
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: 'El nombre debe contener solo letras.',
                },
            },
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: 'El apellido debe contener solo letras.',
                },
            },
        },
        nacimiento: {
            type: DataTypes.DATEONLY, // Para almacenar solo la fecha sin la hora
            allowNull: false,
            //Capa de validacion adicional
            validate: {
                isDate: {
                    msg: 'La fecha de nacimiento debe estar en formato de fecha válido.',
                },
            },

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Asegura que el correo electrónico sea único en la base de datos
            validate: {
                isEmail: {
                    msg: 'Por favor, ingresa un correo electrónico válido.',
                },
            },
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                // Hash de la contraseña antes de almacenarla
                if (value) {
                    const hashedPassword = bcrypt.hashSync(value, 10);
                    this.setDataValue('contraseña', hashedPassword);
                }         
            }
        },   
        provincia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        localidad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codigoPostal: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'codigo_postal',
        },
        direccionNombre: {
            type: DataTypes.STRING,
            allowNull: true,
            field:'direccion_nombre'
        },
        direccionNumero: {
            type: DataTypes.STRING,
            allowNull: true,
            field:'direccion_numero',
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true, // Puedes cambiar a false si el teléfono es obligatorio
        },
        rol: {
            type: DataTypes.STRING,
            defaultValue: 'usuario',
        }

    }, {
        timestamps: false
    },{
        tableName: 'usuarios', // Especifica el nombre exacto de la tabla en la base de datos
    });
    return Usuarios;
};
