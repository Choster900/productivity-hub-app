import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../interfaces/evento';
import { Observable, catchError, map, of } from 'rxjs';
import { Subtarea, TareasEvento } from '../interfaces/tareas-eventos';

@Injectable({
    providedIn: 'root',
})
export class EventosService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getEventos(): Observable<Evento[]> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<Evento[]>(`${this.baseUrl}/api/v1/evento`, {
            headers,
        });
    }

    addEvento(evento: Evento): Observable<Evento> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Pasar los headers en la solicitud HTTP
        return this.http.post<Evento>(`${this.baseUrl}/api/v1/evento`, evento, {
            headers,
        });
    }

    updateEvento(evento: Evento): Observable<Evento> {
        if (!evento.id) throw Error('Evento id not provided');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<Evento>(
            `${this.baseUrl}/api/v1/evento/${evento.id}`,
            evento,
            { headers }
        );
    }

    getTareasByEvento(eventoId: number): Observable<TareasEvento[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<TareasEvento[]>(
            `${this.baseUrl}/api/v1/tarea?idProyectoOrEvento=${eventoId}&isProyecto=false`,
            {
                headers,
            }
        );
    }

    addTaskToEvento(tarea: TareasEvento): Observable<TareasEvento> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Pasar los headers en la solicitud HTTP
        return this.http.post<TareasEvento>(`${this.baseUrl}/api/v1/tarea`, tarea, {
            headers,
        });
    }

    updateTaskInEvents(tarea: TareasEvento): Observable<TareasEvento> {
        if (!tarea.id) throw Error('tarea.id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<TareasEvento>(
            `${this.baseUrl}/api/v1/tarea/${tarea.id}`,
            tarea,
            { headers }
        );
    }

    addSubTaskInTask(subTarea: Subtarea, idTarea: number): Observable<Subtarea> {

        if (!idTarea) throw Error('tarea.id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const newSubTask: Subtarea = {
            idTarea,
            ...subTarea,
        };

        // Pasar los headers en la solicitud HTTP
        return this.http.post<Subtarea>(
            `${this.baseUrl}/api/v1/subtarea`,
            newSubTask,
            {
                headers,
            }
        );
    }

    updateSubTaskInTask(subTarea: Subtarea): Observable<Subtarea> {
        if (!subTarea.id) throw Error('tarea.id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<Subtarea>(
            `${this.baseUrl}/api/v1/subtarea/${subTarea.id}`,
            subTarea,
            { headers }
        );
    }

    updateEtiquetaOnSubTasks(id: number): Observable<Subtarea> {
        if (!id) throw Error('tarea.id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.patch<Subtarea>(`${this.baseUrl}/api/v1/subtarea/${id}`,{}, {
            headers
        });
    }

    deleteSubTareaById(id: number): Observable<boolean> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.delete(`${this.baseUrl}/api/v1/subtarea/${id}`, { headers })
            .pipe(
                map(resp => true),
                catchError(err => of(false)),
            );
    }
}
