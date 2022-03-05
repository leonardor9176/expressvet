import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations/reservations.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  @ViewChild('confirmReservation', { static: false }) private confirmReservationDialog: any
  @ViewChild('cancelDialog', { static: false }) private cancelDialog: any
  @ViewChild('confirmCancelDialog', { static: false }) private confirmCancelDialog: any

  hideNewReservation = true
  hideAdminReservation = true

  reservationId = ''
  reservationInfo: any
  documentCancelation = ''
  cancelReason = ''
  cancelSuccess: boolean = false
  documentCancelationWrong: boolean = true
  reservationSuccess: boolean = true
  noAvailableToReserv: boolean = true
  currentUuid: string = ''

  public reservationForm: FormGroup

  public name: AbstractControl
  public document: AbstractControl
  public reservationDate: AbstractControl
  public description: AbstractControl

  public sub = false

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationsService,
    public dialog: MatDialog
  ) {
    this.reservationForm = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      reservationDate: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.name = this.reservationForm.controls['name']
    this.document = this.reservationForm.controls['document']
    this.reservationDate = this.reservationForm.controls['reservationDate']
    this.description = this.reservationForm.controls['description']
  }

  ngOnInit(): void {
  }

  get f() {
    return this.reservationForm.controls
  }

  validate() {
    this.sub = true
    if (this.reservationForm.invalid) {
      return
    }
    else {
      this.clickReserve()
    }
  }

  clicNewReservation() {
    this.hideNewReservation = !this.hideNewReservation
    this.hideAdminReservation = true
  }

  clicAdminReservation() {
    this.hideAdminReservation = !this.hideAdminReservation
    this.hideNewReservation = true
  }

  async clickReserve(form = this.reservationForm.controls) {
    const reservation = {
      name: form['name'].value,
      document: form['document'].value,
      reservationDate: form['reservationDate'].value,
      description: form['description'].value
    }
    try {
      this.reservationService.createReservation(reservation).subscribe((res: any) => {
        this.reservationSuccess = res?.status
        this.noAvailableToReserv = !res?.available
        this.currentUuid = res?.data? res?.data[0].uuid : ''
        this.openConfirm()
      })
    }
    catch (error) {
      console.log('Error al realizar la reserva: ', error)
      this.reservationSuccess = false
      this.noAvailableToReserv = false
      this.openConfirm()
    }
  }

  async clickSearchReservation(reservationId = this.reservationId) {
    this.reservationInfo = ''
    try {
      this.reservationInfo = await new Promise<any>((resolve) => {
        this.reservationService.searchReservation(reservationId).subscribe((res: any) => {
          if (res.data) {
            resolve(res.data[0])
          }
        })
      })

      this.reservationInfo.reservationDate = this.formatDate(new Date(this.reservationInfo.reservationDate))
    }
    catch (error) {
      console.log('Error al realizar la consulta: ', error)
    }
  }

  formatDate(date: any) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const yyyy = date.getFullYear()
    const MM = months[date.getMonth()]
    const dd = date.getDate()

    let hh
    switch (true) {
      case date.getHours() == 0:
        hh = '12'
        break;
      case date.getHours() > 0 && date.getHours() <= 12:
        hh = date.getHours()
        break;
      default:
        hh = date.getHours() - 12
        break;
    }
    const mm = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    const ampm = (date.getHours() < 12) ? 'am' : 'pm'
    return `${dd} de ${MM} de ${yyyy} ${hh}:${mm} ${ampm}`
  }

  openConfirm() {
    this.dialog.open(this.confirmReservationDialog)
  }

  openCancel() {
    this.dialog.open(this.cancelDialog)
  }

  async cancelReservation(uuid = this.reservationInfo.uuid, document = this.documentCancelation, comment = this.cancelReason) {
    try {
      const { status, validDocument } = await new Promise<any>((resolve) => {
        this.reservationService.cancelReservation({ uuid: uuid, document: document, comment: comment }).subscribe((res: any) => {
          resolve(res)
        })
      })
      this.cancelSuccess = status
      this.documentCancelationWrong = !validDocument
      this.reservationInfo.status = this.cancelSuccess ? 'cancelada' : this.reservationInfo.status
    }
    catch (error) {
      console.log('Error al realizar la consulta: ', error)
    }

    this.dialog.closeAll()
    this.dialog.open(this.confirmCancelDialog)
    this.documentCancelation = ''
    this.cancelReason = ''
  }

  closeDialog() {
    this.dialog.closeAll()
    if(this.reservationSuccess){
      this.reservationForm.controls['name'].setValue('')
      this.reservationForm.controls['document'].setValue('')
      this.reservationForm.controls['reservationDate'].setValue('')
      this.reservationForm.controls['description'].setValue('')
    }
  }
}
