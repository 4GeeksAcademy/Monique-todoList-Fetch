import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const List = () => {
    const [tarea,setTarea] = useState("");
    const [nuevaTarea, setNuevaTarea] = useState([]);

    //obtener tareas al cargar componentes
    useEffect(() => {
      obtenerTarea();
    }, []);
     
   //Obtener tareas del servidor 
    function obtenerTarea(){
      const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json"},
      };

      fetch("https://playground.4geeks.com/todo/users/Monique", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (Array.isArray(result.todos)){//verifica que el resultado sea un array antes de actualizar el estado
              setNuevaTarea(result.todos);
            }else{
              console.error("La respuesta del servidor no es válida:", result);
              setNuevaTarea([]);
            }
        })
         
  };

    //Agregar tarea al servidor y al estado local
    function agregarTarea (e) {
      if (tarea.trim() !== "") {
          
       const nueva = {label: tarea, is_done: false};
         
    const requestOptions = {
        method:"POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify(nueva),
     };

     fetch("https://playground.4geeks.com/todo/todos/Monique", requestOptions)
        .then((response) => response.json())
        .then(() => {
          setNuevaTarea([...nuevaTarea, nueva]);  // Actualizamos el estado local
          setTarea("");  // Limpiamos el input
        })
     }else {
      console.log("La tarea no se puede estar vacia");
    }
  }

    // Eliminar una tarea
   function eliminarTarea(index) {
      const tareaEliminada = nuevaTarea[index];
    // validar que la tarea tenga un ID válido
      if (!tareaEliminada.id) {
        console.error("La tarea no tiene un ID válido.");
        return;
   }
    
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
  
    fetch(`https://playground.4geeks.com/todo/todos/${tareaEliminada.id}`, requestOptions)
      .then((response) => {
          if (!response.ok) {
          return response.text().then((text) => {
            console.error("Error del servidor:", text);
            throw new Error(`Error del servidor: ${text}`);
          });
        }
      })
      .then(() => {
        console.log("Eliminación exitosa en el servidor.");
        const nuevaLista = nuevaTarea.filter((_,i) => i !== index);
        setNuevaTarea(nuevaLista);
      })
  }
  
      //eliminar usuario y tareas
    function eliminarUsuario() {
      const deleteOptions = {
          method:"DELETE",
          headers:{"Content-Type": "application/json" },
      };

      fetch("https://playground.4geeks.com/todo/users/Monique", deleteOptions)
          .then((response) => {
              if (response.ok) {
                  console.log("Usuario eliminado");
                  crearUsuario();// crear usuario despues de eliminarlo
              } else {
                  console.error("Error al eliminar el usuario");
              }
        })
    }
      // crear usuario en el servidor
  function crearUsuario() {
      const createOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify([]), //se envia un array vacio para crear al usuario
      };
      
      fetch("https://playground.4geeks.com/todo/users/Monique", createOptions)
          .then((response) => {
              if (response.ok) {
                  console.log("Usuario creado exitosamente");
                  setNuevaTarea([]);
              } else {
                  console.error("Erros al crear el usuario");
                  
              }
          })
    }


  return(
      <div className="container" >
           <h1>todos</h1>
          <div className="listas">
               <ul>
                  <li>
                     <input type="text" value={tarea} onChange={(e) =>setTarea(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter") {agregarTarea(e);}}} placeholder="What needs to be done?"></input>
                   </li>
                  {Array.isArray(nuevaTarea) && nuevaTarea.map((item, index) => (
                    <li key={index} className="task-item">
                      {item.label}{" "}
                      <FontAwesomeIcon icon={faXmark} onClick={() => eliminarTarea(index)} className="delete-icon" />
                  </li> 
                  ))}
                </ul>
                <div className="footer">{nuevaTarea.length} item left </div>

                
        <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={obtenerTarea}>Cargar Tareas</button>
        <button onClick={eliminarUsuario}>Eliminar Tareas</button>
      </div>
          </div>
             <div className="hoja1"></div> 
             <div className="hoja2"></div>             
      </div>
        
    );
};

export default List