const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tarea(s)`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea(s) Completada(s)`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea(s) Pendiente(s)`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }

];


const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccionar una opción  '.blue);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Presione ${'ENTER'.green} para continuar \n`,
        }];

    console.log('\n');
    await inquirer.prompt(pregunta);
}

const leerInput = async(message) => {

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(pregunta);
    return desc;
};

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0. '.green + 'Cancelar'
    });


    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);
    return id;

    /*  {
        value: tarea.id,
        name: `${'6.'.green} Borrar Tarea(s)`
        }, 
    */
}

const confirmar = async (message) => {
   
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Tareas Seleccionadas: ',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}



/* 
inquirer
  .prompt([
    // Pass your questions in here 
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
   */
