import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  auth(login: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:8000/api/login', {
      username: login,
      password
    });
  }

  logout(): Observable<any> {
    return this.http.post('http://localhost:8000/api/logout', {});
  }

}
