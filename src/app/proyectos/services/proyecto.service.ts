import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

    updateProyecto(proyecto:Proyecto): Observable<Proyecto> {

        if(!proyecto.id) throw Error('Proyecto id not provided');
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<Proyecto>(`${this.baseUrl}/api/v1/proyecto/${proyecto.id}`, proyecto, { headers });
    }



}
