import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  User$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }
  loginUser(user):Observable<any>{
    return this.http.post<any>(this._loginUrl,user)
    .pipe(
      tap((res: any) => {
        console.log(res)
        this.User$.next(res.user);
      })
    )
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}

