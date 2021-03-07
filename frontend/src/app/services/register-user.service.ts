import { Injectable } from '@angular/core';
import { User } from '../modules/user'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  public static host = 'http://localhost:3000/';


  addUser (user:User): Observable<User> {
    const headers = { 'content-type': 'application/json'}  
     const body=JSON.stringify(user);
     console.log(body);
     console.log(RegisterUserService.host);
     return this.http.post<User>(RegisterUserService.host + 'users/register', body,{'headers':headers});//če das User bo vrjeno od backend castlno v user
    }
}
