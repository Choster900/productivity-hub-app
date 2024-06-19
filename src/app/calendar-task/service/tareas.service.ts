import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarea } from '../interface/tarea.interface';

@Injectable({
    providedIn: 'root'
})
export class TareasService {

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }


    fetchAllTasks(): Observable<Tarea[]> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<Tarea[]>(`${this.baseUrl}/api/v1/tarea`, {
            headers,
        });
    }

}
