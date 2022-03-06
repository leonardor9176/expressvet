import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations/reservations.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})

export class AdminReservationsComponent implements OnInit {

  public reservations: any
  public countStatus: any[] = [0, 0, 0, 0]
  public dataSource: any
  public status: any[] = ['reservadas', 'canceladas', 'atendiento', 'completadas']
  public displayedColumns: string[] = ['reservationDate', 'uuid', 'status', 'name', 'document', 'description', 'comments', 'actions']
  constructor(
    private reservationsService: ReservationsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getReservations()
  }

  async getReservations() {
    const token = sessionStorage.getItem('token')
    try {
      this.reservationsService.getReservations(token).subscribe((res: any) => {
        console.log(res.data)
        this.reservations = res.data
        this.dataSource = this.reservations
        this.countByStatus()
      })
    }
    catch (error) {
      console.log('Error al realizar la reserva: ', error)
    }
  }

  countByStatus(reservations = this.reservations) {
    reservations.forEach((res: { status: any; }) => {
      switch (res.status) {
        case 'reservada':
          this.countStatus[0] += 1
          break;
        case 'cancelada':
          this.countStatus[1] += 1
          break;
        case 'atendiendo':
          this.countStatus[2] += 1
          break;
        case 'completada':
          this.countStatus[3] += 1
          break;
      }
    })
    console.log(this.countStatus)
  }

  async changeReservationStatus(uuid: string, status: string) {
    const token = sessionStorage.getItem('token')
    const index = this.reservations.indexOf(this.reservations.find((r: { uuid: string; }) => r.uuid == uuid))
    const body = {
      uuid: uuid,
      status: status
    }

    try {
      this.reservationsService.changeReservationStatus(token, body).subscribe((res: any) => {
        if (res.status) {
          this.reservations.splice(index, 1)
          this.reservations.splice(index, 0, res.data[0])
          this.countStatus = [0, 0, 0, 0]
          console.log(this.reservations)
          this.countByStatus()
          this.dataSource = []
          setTimeout(() => {
            this.dataSource = this.reservations
          }, 1)
        }
      })
    }
    catch (error) {
      console.log('Error al realizar la actualización: ', error)
    }

  }

}
