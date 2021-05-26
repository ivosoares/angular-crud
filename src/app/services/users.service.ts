import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = "https://sheet.best/api/sheets/4bf87ecd-d8d6-4518-9a41-ef58ac6adb18";

  constructor(private httpClient: HttpClient) { }

  // Retorna a lista de Usuarios READ
  getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
