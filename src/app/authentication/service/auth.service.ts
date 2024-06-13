import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.baseUrl
  private user?: User;

  constructor(private http: HttpClient) { }


  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user)
  }

  login(email: string, password: string): Observable<User> {



      return this.http.post<User>(`${this.baseUrl}/api/v1/auth/login`, { email, password })
      .pipe(
     /*    tap(user => console.log(user)), */
        tap(user => {
          this.user = user;
          localStorage.setItem("token", user.token)
          localStorage.setItem("userId", user.id.toString())
        })
      )
  }

  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem("token")) return of(false)

    const token = localStorage.getItem("token")

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}/api/v1/auth/usuario`,{
      headers,
  })
      .pipe(
        /* tap(user => console.log(user)), */
        tap(user => this.user = user),
        map(user => {
          return !!user;
        }),
        catchError(err => {
          console.log(err);

          return of(true)
        }),

      )
  }

  logOut(): void {
    this.user = undefined
    localStorage.removeItem("token")
  }


}
