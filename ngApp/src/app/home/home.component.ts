import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  blogsSub:Subscription | undefined;
  blogs:any[]=[];

  constructor(
    private _blogService:BlogService
  ) { }

  ngOnInit(): void {
    this.getAllBlogs()
  }
  ngOnDestroy():void{
     this.blogsSub?.unsubscribe();
  }
  getAllBlogs(){
    this.blogsSub = this._blogService.getAllBlogs()
     .subscribe(blogs=>{
       console.log(blogs);
       this.blogs = blogs;
     },err =>{
       console.log(err);
       
     })
  }

}
