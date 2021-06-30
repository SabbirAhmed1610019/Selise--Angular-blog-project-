import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit,OnDestroy*/ {
  /*title = 'Blogging.com';
  userInfoSub:Subscription | undefined;
  user = {
    _id: '',
    email: ''
  };*/
  constructor(public _authenticationService: AuthenticationService){}
  /**ngOnInit():void{
    this._authenticationService.User$.subscribe(
      loggedInUser => {
        this.user = loggedInUser;
      });
    this.userInfoSub = this._authenticationService.loginUser(this.user)
    .subscribe(
      res=>{
      console.log(res);
      
      },
      err=>{
        console.log(err)
      }); 
  }
  ngOnDestroy():void{
     this.userInfoSub?.unsubscribe()
  }**/

}
