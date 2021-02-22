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

// Relacion N:N => onDelete: 'CASCADE'
User.belongsToMany(Quiz, {
    as: 'fav',
    foreignKey: 'userId',
    otherKey: 'quizId',
    through: 'Favourites'
});

Quiz.belongsToMany(User, {
    as: 'fan',
    foreignKey: 'quizId',
    otherKey: 'userId',
    through: 'Favourites'
});

( async () => {
    try {
        await sequelize.sync();
        let count = await User.count();
        let count1 = await Quiz.count();
        let count2 = await sequelize.models.Favourites.count();

        if ( count === 0 ) {
            let c = await User.bulkCreate([
                { name: 'Pedro', age: "22"},
                { name: "Anna", age: 23 },
                { name: "Juan", age: 30 }
            ]);
            let q = await Quiz.bulkCreate([
                { question: 'Capital de España', answer: 'Madrid', authorId: 1 },
                { question: 'Capital de Francia', answer: 'Paris', authorId: 1 },
                { question: 'Capital de Italia', answer: 'Roma', authorId: 2 },
                { question: 'Capital de Rusia', answer: 'Moscú', authorId: 3 },
            ])
            let f = await sequelize.models.Favourites.bulkCreate([
                { userId: 1, quizId: 3 },
                { userId: 2, quizId: 4 },
                { userId: 2, quizId: 1 },
                { userId: 2, quizId: 2 },
                { userId: 3, quizId: 2 }
              ])
            
            process.stdout.write(`   BD creado con ${c.length} usuarios...\n
            ... y ${q.length} quizes, ${f.length} favoritos`);
           
            return;
        } else {
            process.stdout.write(` BD existe y tiene ${count} elementos\n
            ... y ${q.length} quizes, ${count2} favoritos`);
            return;
        };
    } catch (err) {
        console.log(`El error es ... ${err}`);
    }
})();

module.exports = sequelize;