import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private Router: Router
  ) { }

  ngOnInit(): void {
  }

  goToReservation() {
    this.Router.navigate(['/reservation'])
  }
}
