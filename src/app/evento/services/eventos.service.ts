import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../interfaces/evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http : HttpClient) { }

  addEvento( evento : Evento): Observable<Evento> {

    return this.http.post<Evento>(`${ this.baseUrl }/api/v1/evento`, evento );


  }

}
