const fs = require('fs');

class Container {

    constructor() {
    
    }
    createFile(data){
        fs.writeFile('./src/archives/users.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('El archivo ha sido creado');
        });
    }

    async readFile(){
        const data = await fs.promises.readFile('./src/archives/users.json', 'utf-8');
        return JSON.parse(data);
    }

}

module.exports = Container;