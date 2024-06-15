import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subtarea, TareasProyecto } from '../interfaces/tarea-proyecto.interface';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {

    constructor(private http: HttpClient) { }
    private baseUrl: string = environment.baseUrl;


    getProyectos(): Observable<Proyecto[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Proyecto[]>(`${this.baseUrl}/api/v1/proyecto`, {
            headers,
        });
    }

    addProyecto(proyecto: Proyecto): Observable<Proyecto> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Proyecto>(`${this.baseUrl}/api/v1/proyecto`, proyecto, { headers });
    }

    updateProyecto(proyecto: Proyecto): Observable<Proyecto> {

        if (!proyecto.id) throw Error('Proyecto id not provided');
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<Proyecto>(`${this.baseUrl}/api/v1/proyecto/${proyecto.id}`, proyecto, { headers });
    }


    getTareasByProyecto(proyectoId: number): Observable<TareasProyecto[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<TareasProyecto[]>(
            `${this.baseUrl}/api/v1/tarea?idProyectoOrEvento=${proyectoId}&isProyecto=true`,
            {
                headers,
            }
        );
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


    addTaskToEvento(tarea: TareasProyecto): Observable<TareasProyecto> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Pasar los headers en la solicitud HTTP
        return this.http.post<TareasProyecto>(`${this.baseUrl}/api/v1/tarea`, tarea, {
            headers,
        });
    }


    updateTaskInEvents(tarea: TareasProyecto): Observable<TareasProyecto> {
        if (!tarea.id) throw Error('tarea.id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<TareasProyecto>(
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
}
