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

module.exports = sequelize;