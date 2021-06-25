require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccionar una opción  '.green);
        console.log('=========================='.green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tarea(s)`);
        console.log(`${'3.'.green} Listar tarea(s) Completada(s)`);
        console.log(`${'4.'.green} Listar tarea(s) Pendiente(s)`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea(s)`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readline = require('readline').createInterface ({
            input: process.stdin,
            output: process.stdout

        });

        readline.question('Ingrese la opción deseada: ', (opt) => {
            //console.log({opt});
            readline.close();
            resolve(opt);
        })
    }); 
}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface ({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\n Presione ${'ENTER'.green} para continuar \n`, (opt) => {
            readline.close();
            resolve();
        });

    });
    
}

module.exports = {
    mostrarMenu,
    pausa
}