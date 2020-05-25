import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '@models/User';
import {Observable} from 'rxjs';

export const API_URL = 'http://localhost:8080';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(data: User): Observable<any> {
    const username = data.username;
    const password = data.password;
    return this.http.post<any>(`${API_URL}/authenticate`, { username, password }, httpOptions)
      .pipe(map(d => d));
  }

  register(data: User): Observable<any> {
    const username = data.username;
    const password = data.password;
    const email = data.email;
    return this.http.post<any>(`${API_URL}/register`, {username, password, email}, httpOptions)
      .pipe(map(d =>  d));
  }
}
