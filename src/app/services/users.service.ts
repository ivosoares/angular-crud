import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = "https://sheet.best/api/sheets/4bf87ecd-d8d6-4518-9a41-ef58ac6adb18";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Lista usuario Individualmente
  getUser(nome: string):Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/nome/*${nome}*`);
  }

  //  CRUD (CREATE, READ, UPDATE, DELETE)
  // Retorna a lista de Usuarios READ
  getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Salva o usuario no banco CREATE
  postUsers(user: User):Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  // deletar o usuario DELETE
  deleteUser(nome: string):Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/nome/*${nome}*`);
  }

  // Atualiza Usuario UPDATE
  updateUser(nome: string, user: User):Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/nome/*${nome}*`, user, this.httpOptions);
  }

}
