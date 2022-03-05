import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: string = ''
  public password: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigate([`admin-reservations/${sessionStorage.getItem('id')}`])
    }
  }

  login() {
    if (this.user && this.password) {
      this.authService.login(this.user, this.password)
        .then(res => {
          if (res.status) {
            this.router.navigate([`admin-reservations/${res.id}`])
          }
          else {
            console.log(res.error)
          }
        })
    }
  }
}
