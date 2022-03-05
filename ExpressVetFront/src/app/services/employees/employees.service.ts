import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  login (user: string, password: string) {
    const data = {
      "document": user,
      "password": password
    }
    return this.http.post(`${this.URL_API}/api/employees/login`, data)
  }
}
