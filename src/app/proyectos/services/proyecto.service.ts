import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
        return this.http.get<Proyecto[]>(`${this.baseUrl}/api/v1/evento`, {
            headers,
        });
    }

}