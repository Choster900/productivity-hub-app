import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../interfaces/evento';
import { Observable } from 'rxjs';

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
        if (!evento.id) throw Error('Hero id is required');

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<Evento>(
            `${this.baseUrl}/api/v1/evento/${evento.id}`,
            evento,
            { headers }
        );
    }
}
