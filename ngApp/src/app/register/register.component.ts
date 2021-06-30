import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerUserData = {email:'',password:''}
  constructor(private _auth: AuthenticationService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/login'])
      },
      err => console.log(err)
    )
  }

}
