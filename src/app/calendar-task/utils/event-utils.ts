import { Tarea } from './../interface/tarea.interface';
import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;

export function createEventId(): string {
    return String(eventGuid++);
}

export function mapTareasToEventInputs(tareas: Tarea[]): EventInput[] {
    return tareas.map(tarea => {
        const fechaLimite = new Date(tarea.fechaLimite); // Convertir a objeto Date si es necesario

        const label = !tarea.evento ? 'primary' : 'warning'
        return {
            id: createEventId(),
            title: tarea.titulo,
            start: fechaLimite.toISOString(), // Convertir a ISO string
            label: label,
            type: 'event',
            description: tarea.descripcion,
            color: '#8e1dce',   // an option!
            textColor: '#8e1dce', // an option!
        };
    });
}
