const { User, Quiz } = require('./model').models;

// Mostrar todos los favoritos en la BD incluyendo <user> y <id>
exports.list = async( rl ) => {
    let users = await User.findAll({
        include: [{ model: Quiz, as: 'fav'}]
    });

    users.forEach( u => {
        if ( u.fav.length !== 0 ) {
            u.fav.forEach( q => 
                rl.log(`   Quiz  ${q.id} (${q.question}) es favorito de ${u.name}`)
            )
        }
    });
};

// Crear favorito en la Base de datos
exports.create = async (rl) => {
    let name = await rl.questionP("Introduzca nombre");
    let id = await rl.questionP("Introduzca el ID del quiz");
    if ( !name || !id) throw new Error(`La respuesta no puede estar vacía`);

    let user = await User.findOne({ where: {name}});
    if (!user) throw new Error(`  El usuario ${name} no está en la Base de datos`);

    let quiz = await Quiz.findByPk(Number(id));
    if ( !quiz ) throw new Error(`El quiz no está en la base de datos...`);

    await user.addFav(quiz);

    rl.log(`  '${quiz.question} -> ${quiz.answer} (${id})' favorito de ${name}`);
};

// Borrar favorito de la base de datos
exports.delete = async (rl) => {
    let name = await rl.questionP(`Introduzca Nombre`);
    let id = await rl.questionP(`Introduzca identificador`);

    if ( !name || !id ) throw new Error(`La respuesta no puede estár vacía`);

    let user = await User.findOne({ where: {name}});
    if ( !user ) throw new Error(`El usuario no existe en la BD`);

    let quiz = await Quiz.findByPk(Number(id));
    if ( !quiz ) throw new Error(`Ese quiz no está en la BD`);

    await user.removeFav(quiz);

    rl.log(`  El favorito (${id}, ${name}) borrado`);
};