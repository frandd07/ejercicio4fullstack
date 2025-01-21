'use client'
import { useState } from "react";

export default function CreateHabito() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [completado, setCompletado] = useState(false);

    function isFechaValida(fecha) {
        const fechaActual = new Date();
        const fechaHabitual = new Date(fecha);

        // Poner la hora de ambas fechas a las 00:00:00 para comparar solo las fechas
        fechaActual.setHours(0, 0, 0, 0);
        fechaHabitual.setHours(0, 0, 0, 0);

        return fechaHabitual >= fechaActual;
    }

    async function crearHabito(e) {
        e.preventDefault();

        if (!isFechaValida(fecha)) {
            alert("La fecha no puede ser en el pasado.");
            return;
        }

        const response = await fetch("/api/habito", {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                habito: {
                    nombre: nombre,
                    descripcion: descripcion,
                    fecha: fecha,
                    completado: completado
                }
            })
        });

        if (response.ok) {
            alert("Hábito creado");
            setNombre("");
            setDescripcion("");
            setFecha("");
            setCompletado(false);
        }
    }

    return (
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
                        
                    />
                </label>
                <br />
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
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
    );
}
