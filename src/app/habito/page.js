'use client'

import { useEffect, useState } from "react";

export default function ListHabitos() {
    const [habitos, setHabitos] = useState([]);

    async function fetchHabitos() {
        const response = await fetch("/api/habito");
        const body = await response.json();
        setHabitos(body);
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

        fetchHabitos()
     
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}    
