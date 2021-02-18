const {Sequelize, Model, DataTypes} = require('sequelize');

const options = { logging: false };
const sequelize = new Sequelize('sqlite:db.sqlite', options);

class User extends Model {};

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

( async () => {
    try {
        await sequelize.sync();
        let count = await User.count();
        if ( count === 0 ) {
            let c = await User.bulkCreate([
                { name: 'Pedro', age: "22"},
                { name: "Anna", age: 23 },
                { name: "Juan", age: 30 }
            ]);
            process.stdout.write(`   BD creado con ${c.length} elementos...\n`);
           
            return;
        } else {
            process.stdout.write(` BD existe y tiene ${count} elementos\n`);
            return;
        };
    } catch (err) {
        console.log(`El error es ... ${err}`);
    }
})();

module.exports = sequelize;