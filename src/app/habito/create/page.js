'use client'

import { useState } from "react"

export default function createHabito(){
    const[nombre, setNombre] = useState("")
    const[descripcion,setDescripcion] = useState("")
    const[fecha, setFecha] = useState("")
    const[completado,setCompletado] = useState(false)

    async function crearHabito(){

        let fechaUsuario = fecha;
        if (fechaUsuario === "") {
            fechaUsuario = new Date().toISOString().split("T")[0];
        }

        const response = await fetch("/api/habito", {
            method: 'POST',
            headers:{"content-type": "application/json"},
            body: JSON.stringify({
                habito: {
                    nombre: nombre,
                    descripcion: descripcion,
                    fecha:fechaUsuario,
                    completado: completado
                }
            })
        })

        if(response.ok){
            alert("Hábito creado")
            setNombre("")
            setDescripcion("")
            setFecha("")
            setCompletado(false)
        }
    }

    return(
        <div>
            <h1>Añadir hábito</h1>
      <form onSubmit={crearHabito}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <br />
        <label>
          Completado:
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </label>
        <br />
        <input type="submit" value="Añadir hábito" />
      </form>
        </div>
    )
}