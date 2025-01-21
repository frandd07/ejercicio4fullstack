'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListHabitos() {
    const [habitos, setHabitos] = useState([]);

    async function fetchHabitos() {
        const response = await fetch("/api/habito");
        const body = await response.json();

        const fechaActual = new Date().toLocaleDateString("en-CA")
        const habitosDeHoy = body.filter(habito => habito.fecha === fechaActual);
        setHabitos(habitosDeHoy);
    }

    useEffect(() => {
        fetchHabitos();
    }, []);

    async function actualizarCompletado(id,completado){
        const response = await fetch("/api/habito", {
            method:'PUT',
            headers: {'content-type': 'application.json'},
            body: JSON.stringify({
                id: id,
                update:{
                    completado
                }
            })
        })

        setHabitos((listaAnterior) =>
            listaAnterior.map((habito) =>
                habito.id === id ? { ...habito, completado } : habito
            )
        );
    }
        
    async function deleteHabito(habitoID,completado) {
        if (!completado) {
            alert("El hábito no está completado y no puede ser eliminado.");
            return;
        }
            await fetch("/api/habito", {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id: habitoID })
            });

            fetchHabitos();
    }

    return (    
        <div>
            <table border="1">
                <caption>Hábitos de hoy</caption>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Completado</th>
                    </tr>
                </thead>
                <tbody>
                    {habitos.map(habito => (
                        <tr key={habito.id}>
                            <td>{habito.nombre}</td>
                            <td>{habito.descripcion}</td>
                            <td>{habito.fecha}</td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={habito.completado}
                                        onChange={(e) => actualizarCompletado(habito.id, e.target.checked)}
                                    />
                                </label>
                            </td>
                            <td><button onClick={() => deleteHabito(habito.id,habito.completado)}>❌</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
             <br/>
            <Link href={"/habito/create"}>Añadir hábito</Link>
        </div>
    );
}    
