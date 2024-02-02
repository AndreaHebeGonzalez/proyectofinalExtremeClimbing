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
            validate: {
                isNumeric: {
                    msg: 'El código postal debe contener solo dígitos.',
                },
            },
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
            validate: {
                isNumeric: {
                    msg: 'El número de calle debe contener solo dígitos.',
                },
            },
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true, // Puedes cambiar a false si el teléfono es obligatorio
            validate: {
                isNumeric: {
                    msg: 'El número de teléfono debe contener solo dígitos.',
                },
            },
        },
            /*
            En Sequelize, el método set es un "hook" (gancho) que permite personalizar cómo los valores son asignados a los atributos de un modelo justo antes de que se almacenen en la base de datos. Se usa para ejecutar acciones o transformaciones en los datos antes de que se persistan.
            set es un gancho (hook) de Sequelize que se activa automáticamente antes de que el valor de la contraseña se almacene en la base de datos.

            value es el valor de la contraseña que se intenta asignar.

            bcrypt.hashSync(value, 10) realiza el hash de la contraseña utilizando la biblioteca bcrypt. El segundo argumento (10 en este caso) es el "cost factor" que controla la cantidad de rondas de hashing. Cuanto mayor sea el valor, más seguro pero más lento será el hash.

            this.setDataValue('contraseña', hashedPassword) establece el valor de la contraseña en el modelo después de aplicar la función de hash. Esto asegura que el valor almacenado en la base de datos sea el hash y no la contraseña sin procesar.
            */
        

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


/*
secuencia típica en una aplicación Express con Sequelize:

Llegada de los Datos a las Rutas/Controladores de Express: En una aplicación Express, los datos generalmente llegan primero a través de las rutas o controladores. Esto ocurre cuando un cliente hace una solicitud (por ejemplo, una solicitud POST con datos de formulario) y esos datos se manejan en el controlador asociado a la ruta.

Validación con Express Validator: En este punto, puedes usar Express Validator para validar los datos que llegan a través de las solicitudes HTTP. Express Validator se integra típicamente en el flujo de manejo de las rutas o controladores de Express. Puedes definir reglas de validación específicas para cada campo en tu solicitud.

Interacción con el Modelo de Sequelize: Después de que los datos han pasado por la validación en las rutas o controladores, y antes de realizar operaciones de base de datos (como crear o actualizar registros), puedes interactuar con el modelo de Sequelize. Aquí es donde se aplican las validaciones a nivel del modelo.

Validación a Nivel del Modelo con Sequelize: Sequelize te permite definir reglas de validación directamente en el modelo, como las que hemos discutido anteriormente con validate. Estas reglas se aplican antes de que las operaciones de la base de datos se ejecuten.

La idea de "validación a nivel del modelo" en Sequelize es que, incluso antes de intentar persistir los datos en la base de datos, puedes garantizar que cumplen con ciertas restricciones. Esto agrega una capa adicional de seguridad y puede ayudar a mantener la integridad de los datos en la base de datos.

En resumen, Express Validator se ocupa principalmente de la validación en el nivel de las rutas o controladores antes de que los datos lleguen al modelo de Sequelize. La validación en Sequelize, por otro lado, se aplica antes de realizar operaciones de base de datos. Ambos pueden coexistir y complementarse, y no deberían generar conflictos si están configurados correctamente.
*/