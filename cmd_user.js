const User = require("./model").models.User;

exports.help = (rl) => rl.log(
    ` Comandos (parametros que son requeridos): 
    >h              ## Muestra la ayuda
    >
    > lu | ul | u   ## Listar (todos) usuarios
    > cu | uc       ## Crear usuario
    > ru | ur | r   ## Leer usuario ( Muestra la edad )
    > uu            ## Actualizar usuario (user update)
    > du | ud       ## Borrar usuario (delete user)
    >
    > e             ## Salir (Exit)`
);

exports.create = async (rl) => {
    let name = await rl.questionP("Introduzca nombre: ");
    if (!name) throw new Error("La respuesta no puede estar vacía");

    let age = await rl.questionP("Introduzca la edad: ");
    if (!age) throw new Error("La respuesta no puede estar vacía");

    await User.create(
        { name, age }
    );
    rl.log(` ${name} creado con ${age} años..`);
};

exports.list = async (rl) => {
    let users = await User.findAll();
    users.forEach(element => {
        rl.log(` ${element.name} tiene ${element.age} años`)
    });
};

exports.read = async (rl) => {
    let name = await rl.questionP("¿Qué nombre desea? : ");
    if (!name) throw new Error("La respuesta no puede estar vacía");

    let user = await User.findOne(
        { where: {name} }
    );
    if (!user) throw new Error(` ${name} no está en la base de datos..`);

    rl.log(` ${user.name} tiene ${user.age} años`);
};

exports.update = async (rl) => {
    let old_name = await rl.questionP("Qué nombre deseas actualizar? ");
    if (!old_name) throw new Error("La respuesta no puede estar vacía");

    let name = await rl.questionP("¿Qué nombre desea? : ");
    if (!name) throw new Error("La respuesta no puede estar vacía");

    let age = await rl.questionP("Introduzca la nueva edad: ");
    if (!age) throw new Error("La respuesta no puede estar vacía");

    let n = await User.update(
        { name, age },
        { where: {name: old_name }}
    );

    if ( n[0] === 0 ) throw new Error(` ${old_name} no está en la base de datos..`);

    rl.log(` ${old_name} se ha actualizado a ${name} con ${age} años`);
};

exports.delete = async (rl) => {
    let name = await rl.questionP("¿Qué nombre desea borrar? : ");
    if (!name) throw new Error("La respuesta no puede estar vacía");

    let n = await User.destroy(
        { where: {name} }
    );

    if ( n === 0 ) throw new Error(`No existe ${name}`);
    rl.log(` ${name} ha sido borrado de la base de datos...`);
}