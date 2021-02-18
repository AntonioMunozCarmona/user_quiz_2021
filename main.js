const user = require('./cmd_user');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

rl.log = (msg) => console.log(msg);
rl.questionP = function (string) {
    return new Promise( (resolve) => {
        this.question(` ${string}: `, (answer) => resolve(answer.trim()))
    })
};
rl.prompt();
rl.on('line', async (line) => {
    try {
        
        let cmd = line.trim();
        if ('' === cmd) {}
        else if ('h' === cmd ) { user.help(rl)}
        else if (['lu', 'ul', 'u'].includes(cmd)) { await user.list(rl);}
        else if (['cu', 'uc'].includes(cmd)) { await user.create(rl)}
        else if (['ru', 'ur', 'r'].includes(cmd)) { await user.read(rl)}
        else if (['uu'].includes(cmd)) {await user.update(rl)}
        else if (['du', 'ud'].includes(cmd)) { await user.delete(rl)}
        else if ('e' === cmd) {rl.log(`Hasta Pronto!!`); process.exit(0);}
        else { rl.log(`Comando no soportado `); user.help(rl)}

    } catch (err) {
        rl.log(`Se ha producido un error...${err}`);
    } finally {
        rl.prompt();
    }
});