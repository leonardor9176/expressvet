import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

//import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService
    //private RouterService: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged()

    this.subscription = this.authService.isAuthenticatedObserver().subscribe((isLogged)=>{
      this.isLogged = isLogged;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  logout () {
    this.authService.logout()
  }
}
