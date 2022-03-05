import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations/reservations.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {

  public reservations: any
  constructor(
    private reservationsService: ReservationsService
  ) { }

  ngOnInit(): void {
    this.getReservations()
  }

  async getReservations() {
    const token = sessionStorage.getItem('token')
    try {
      this.reservationsService.getReservations(token).subscribe((res: any) => {
        this.reservations = res.data
      })
    }
    catch (error) {
      console.log('Error al realizar la reserva: ', error)
    }
  }
}
