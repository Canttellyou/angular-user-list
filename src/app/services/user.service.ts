import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
