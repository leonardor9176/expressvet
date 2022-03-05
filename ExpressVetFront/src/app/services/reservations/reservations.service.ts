import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createReservation(body: any) {
    return this.http.post(`${this.URL_API}/api/reservations/create`, body)
  }

  getReservations(token: any) {
    const headers = { authorization: `JWT ${token}`}
    return this.http.get(`${this.URL_API}/api/reservations/`, {headers: headers})
  }
  
  searchReservation(uuid: string) {
    return this.http.get(`${this.URL_API}/api/reservations/search?uuid=${uuid}`)
  }

  cancelReservation(body: any) {
    return this.http.put(`${this.URL_API}/api/reservations/cancel`, body)
  }
}
