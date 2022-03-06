import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent implements OnInit {

  @Input() reservation: any

  constructor() { }

  ngOnInit(): void {
    // const date = new Date(this.reservation.reservationDate)
    // this.reservation.reservationDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes(): date.getMinutes()}`
  }

  // formatDate(date: any) {
  //   const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  //   const yyyy = date.getFullYear()
  //   const MM = months[date.getMonth()]
  //   const dd = date.getDate()

  //   let hh
  //   switch (true) {
  //     case date.getHours() == 0:
  //       hh = '12'
  //       break;
  //     case date.getHours() > 0 && date.getHours() <= 12:
  //       hh = date.getHours()
  //       break;
  //     default:
  //       hh = date.getHours() - 12
  //       break;
  //   }
  //   const mm = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  //   const ampm = (date.getHours() < 12) ? 'am' : 'pm'
  //   return `${dd} de ${MM} de ${yyyy} ${hh}:${mm} ${ampm}`
  // }
}
