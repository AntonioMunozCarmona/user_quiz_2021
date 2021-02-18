const { User, Quiz } = require('./model').models;

exports.list = async (rl) => {
    // Mostrar todos los quizes en la BD Incluyendo Id y autor

    let quizes = await Quiz.findAll(
        { include: [{
            model: User,
            as: 'author'
        }]}
    );

    quizes.forEach(element => {
        rl.log(`   "${element.question}" (por ${element.author.name}, id=${element.id})`)
    });
};



exports.create = async (rl) => {
    // Crea el quiz con <question> y <answer> en la BD
    let name = await rl.questionP("Enter User: ");
    let user = await User.findOne({ where: {name} });
    if (!user) throw new Error(`El usuario ${user} no existe..`);
    let question = await rl.questionP("Introduzca pregunta");
    if (!question) throw new Error(`La respuesta no puede estar vacía`);

    let answer = await rl.questionP("Introduzca la respuesta");
    if (!answer) throw new Error(`La respuesta NO PUEDE estar vacía`);

    await Quiz.create(
        { question,
          answer, 
          authorId: user.id
        }
    );
    rl.log(`   El usuario ${name} ha creado el Quiz\n
    Pregunta: ${question}\n
    Respuesta: ${answer}`);
}

exports.test = async (rl) => {
    // Test (PLAY) quiz identificando por <id>

    let id = await rl.questionP('Introduzca el <id> del quiz: ');
    let quiz = await Quiz.findByPk(Number(id));

    if (!quiz) throw new Error(`El quiz con <id> ${id} no está en la base de datos`);
    
    let answered = await rl.questionP(quiz.question);

    if (answered.toLowerCase().trim() === quiz.answer.toLowerCase().trim()) {
        rl.log(`La respuesta "${answered}" es correcta`);
    } else {
        rl.log(`La respuesta "${answered}" NO es correcta`);
    }
};

exports.update = async (rl) => {
    // Actualiza un quiz (identificado por su <id> en la BD)

    let id = await rl.questionP('Introduzca el <id> del quiz a modificar: ');
    let quiz = await Quiz.findByPk(Number(id));

    let question = await rl.questionP("Introduzca pregunta");
    if (!question) throw new Error(`La respuesta no puede estar vacía`);

    let answer = await rl.questionP("introduzca la respuesta");
    if (!answer) throw new Error("La respuesta no puede estar vacia");

    quiz.question = question;
    quiz.answer = answer;
    await quiz.save({ fields: ["question", "answer"]});

    rl.log(`El quiz con <id: ${id}> se ha actualizado a ${question} => ${answer}`);

};

exports.delete = async (rl) => {
    // Bprra un quiz identificado por su <id>

    let id = await rl.questionP("Introduzca el <id> del quiz a borrar: ");
    let n = await Quiz.destroy({ where: {id} });

    if ( n === 0 ) throw new Error(`El <id: ${id} no está en la BD`);
    rl.log(`   El <id: ${id}> ha sidp borrado de la BD`);
};

