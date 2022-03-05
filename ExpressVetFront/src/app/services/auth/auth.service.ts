import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { EmployeesService } from '../employees/employees.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged = new Subject<boolean>();

  constructor(
    private router: Router,
    private employeesService: EmployeesService,
    public jwtHelper: JwtHelperService
  ) { }

  async login(user: string, password: string) {
    try {
      const promise = await new Promise<any>((resolve, reject) => {
        this.employeesService.login(user, password).subscribe((res: any) => {
          if (res.status) {
            resolve(res)
          }
          else {
            reject(res.error)
          }
        })
      })
      sessionStorage.setItem('id', promise.data[0]._id)
      sessionStorage.setItem('token', promise.data[0].token)
      this._isLogged.next(this.isLogged())
      return {
        status: promise.status,
        id: promise.data[0]._id
      }
    }
    catch (error) {
      return {
        status: false,
        error: `error al validar al usuario: ${error}`
      }
    }
  }

  isLogged() {
    return sessionStorage.getItem('token') ? true : false
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token') as string
    if(this.jwtHelper.isTokenExpired(token)){
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('token')
    }
    return !this.jwtHelper.isTokenExpired(token)
  }

  isAuthenticatedObserver(): Observable<boolean> {
    return this._isLogged.asObservable()
  }

  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    this._isLogged.next(this.isAuthenticated())
    this.router.navigate([''])
  }
  
}
