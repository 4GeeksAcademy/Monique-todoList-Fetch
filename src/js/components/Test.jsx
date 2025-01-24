import React from "react"

const Test = () => {

    function obtenerTarea(){
        console.log("obtenerTarea")
        const requestOptions = {
            method: "GET",
            Headers: { "Content-Type": "application/json"},
        };

        fetch("https://playground.4geeks.com/todo/users/Monique", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result));
    }

    function agregarTarea(){
        console.log("agregarTarea")
        
        const requestOptions = {
            method:"POST",
            Headers:{ "Content.Type": "application/jason"},
            body: JSON.stringify({
               "label": "salir",
               "is_done": false
            }),
        };                            
                
        fetch("https://playground.4geeks.com/todo/todos/Monique", requestOptions)
            .then( (response) => response.json())
            .then( (data) => console.log(data))
        }
   
    function eliminarTarea(idTarea){
        console.log("eliminarTarea", idTarea);
        
        const requestOptions = {
            method:"DELETE",
            Headers:{"Content.Type": "application/jason" },
        };

        fetch("https://playground.4geeks.com/todo/todos/"+idTarea, requestOptions)
            .then((response) => response.text())
            .then(() => obtenerTarea());                               
        }
        
    function eliminarUsuario() {
        console.log("eliminarUsuario");
        const deleteOptions = {
            method:"DELETE",
            Headers:{"Content.Type": "application/json" },
        };

        fetch("https://playground.4geeks.com/todo/users/Monique", deleteOptions)
            .then((response) => {
                if (response.ok) {
                    console.log("Usuario eliminado");
                    crearUsuario();//llamamos a crear usuario despues de eliminarlo
                } else {
                    console.error("Error al eliminar el usuario");
                }
            })
        }

    function crearUsuario() {
        console.log("crearUsuario");
        const createOptions = {
            method: "POST",
            Headers: { "Contet-Type": "application/json"},
            body: JSON.stringify([]), //se envia un array vacio para crear al usuario
        };
        
        fetch("https://playground.4geeks.com/todo/users/Monique", createOptions)
            .then((response) => {
                if (response.ok) {
                    console.log("Usuario creado exitosamente");
                } else {
                    console.error("Erros al crear el usuario");
                }
            })
            .catch((error) => console.error("Error:", error));
        }


        return (
        <>
        <h1>Test</h1>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={obtenerTarea}>obtener Tareas</button>
        <button onClick={agregarTarea}>agregar Tarea</button>
        <button onClick={() => eliminarTarea(1)}>Eliminar Tarea</button>
        <button onClick={eliminarUsuario}>Eliminar y Recrear Usuario</button>
        </div>
        </>
    );
};

export default Test;