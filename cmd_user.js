const {User, Quiz} = require("./model").models;

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
    > lq | ql | q   ## Listar (todos) los quizes
    > cq | qc       ## Crear quiz
    > tq | qt | t   ## Test quiz => Play
    > uq | qu       ## Actualizar quiz (quiz update)
    > dq | qd       ## Borrar quiz (delete quiz)

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
        { 
            where: {name},
            include: [{ model: Quiz, as: 'posts' }]
        }
    );
    if (!user) throw new Error(` ${name} no está en la base de datos..`);

    rl.log(` ${user.name} tiene ${user.age} años`);

    rl.log(` Sus Quizes:`)
    user.posts.forEach( 
        (quiz) => rl.log(`     ${quiz.question} => ${quiz.answer} ${quiz.id}`)
    );
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