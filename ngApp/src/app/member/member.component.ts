import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BlogService } from '../blog.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit,OnDestroy {
  deleteBlogSub :Subscription | undefined;
  deleteBlogs : any | undefined;
  blogId : any;

  user = {
    _id: '',
    email: ''
  };

  blogs: any[] = [];

  constructor(
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _blogService: BlogService
    ) { }

  ngOnInit(): void {

    this._authService.User$.subscribe(
      loggedInUser => {
        this.user = loggedInUser;
        this.getAllBlogs();
      });

     /*this.blogId=this._activatedRoute.snapshot.paramMap.get('blogId')
     this.deleteBlog(this.blogId)*/

  }
  ngOnDestroy():void{
    /*this.deleteBlogSub?.unsubscribe*/
  }

  getAllBlogs() {
    this._blogService.getAllBlogs()
    .subscribe((res: any) => {
      this.blogs = res;
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  /*deleteBlog(blogId:any){
    console.log(blogId);
    
    this.deleteBlogSub = this._blogService.deleteBlog(blogId)
     .subscribe(details =>{
       this.deleteBlogs  = details;
     },err=>{
       console.log(err);  
     })
  }*/

}
