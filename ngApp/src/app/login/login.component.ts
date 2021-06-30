import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErr: string = '';

  loginUserData = {email:'',password:''}
  constructor(private _auth: AuthenticationService,
      private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){

    this.loginErr = '';

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      (res: any) => {
        // console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/member'])
      },
      err => {
        this.loginErr = err.error;
        console.log(err.error)
      }
    )
  }

}
