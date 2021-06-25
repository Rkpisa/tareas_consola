require('colors');
const { 
    guardarDB,
    leerDB 
} = require('./helpers/guardarArchivo');
//const {mostrarMenu, pausa} = require('./helpers/mensajes');// para otra alternativa
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
//const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer tareas  
        //? cargarTareas 
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();// mostrarMenu(); altenativa anterior
        
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                //console.log(desc);
            break;
        
            case '2':
                tareas.listadoCompleto();
            break;

            case '3': // Listar Completadas
                tareas.ListarPendientesCompletadas(true);
            break;

            case '4': // Listar Pendientes
                tareas.ListarPendientesCompletadas(false);
            break;

            case '5': // Completados - Pendientes
                const  ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                //console.log(ids);
            break;

            case '6': // Borrar Tarea(s)
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    // ¿Está Seguro?
                    const ok = await confirmar('¿Está Seguro?');
                    //console.log(ok);
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
        }
        guardarDB( tareas.listadoArr);
        await pausa();
    } while(opt !== '0');
}

main();