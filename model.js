const {Sequelize, Model, DataTypes} = require('sequelize');

const options = { logging: false };
const sequelize = new Sequelize('sqlite:db.sqlite', options);

class User extends Model {};
class Quiz extends Model {};

User.init(
    { name: {
        type: DataTypes.STRING,
        unique: { msg: "El nombre ya existe" },
        allowNull: false,
        validate: {
            isAlphanumeric: { args: true, msg: "name: Caracteres inválidos" }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: { args: [0], msg: "Edad menor de 0" },
            max: { args: [120], msg: "Edad mayor de 120" }
        }
    }
}, { sequelize } 
);

Quiz.init(
    { question: {
        type: DataTypes.STRING,
        unique: { msg: "El Quiz ya existe" }
    }, 
    answer: DataTypes.STRING
    },
    { sequelize }
);
// Relaciones
// 1 usuario tiene N quizes
Quiz.belongsTo(User, {
    as: 'author',
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
});

User.hasMany(Quiz, {
    as: 'posts',
    foreignKey: 'authorId'
});

( async () => {
    try {
        await sequelize.sync();
        let count = await User.count();
        let count1 = await Quiz.count();

        if ( count === 0 ) {
            let c = await User.bulkCreate([
                { name: 'Pedro', age: "22"},
                { name: "Anna", age: 23 },
                { name: "Juan", age: 30 }
            ]);
            var q = await Quiz.bulkCreate([
                { question: 'Capital de España', answer: 'Madrid', authorId: 1 },
                { question: 'Capital de Francia', answer: 'Paris', authorId: 1 },
                { question: 'Capital de Italia', answer: 'Roma', authorId: 2 },
                { question: 'Capital de Rusia', answer: 'Moscú', authorId: 3 },
            ])
            process.stdout.write(`   BD creado con ${c.length} usuarios...\n
            ... y ${q.length} quizes`);
           
            return;
        } else {
            process.stdout.write(` BD existe y tiene ${count} elementos\n
            ... y ${q.length} quizes`);
            return;
        };
    } catch (err) {
        console.log(`El error es ... ${err}`);
    }
})();

module.exports = sequelize;