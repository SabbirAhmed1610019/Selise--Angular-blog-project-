import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit ,OnDestroy{

  blogDetailsSub :Subscription | undefined;
  blogDetails : any | undefined;
  blogId : any;

  constructor(
    private _router: ActivatedRoute,
    private _blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogId=this._router.snapshot.paramMap.get('blogId')
    this.getBlogDetails(this.blogId)
  }
  ngOnDestroy(): void {
    this.blogDetailsSub?.unsubscribe
  }

  getBlogDetails(blogId:any){
    this.blogDetailsSub = this._blogService.getBlogDetails(blogId)
     .subscribe(details =>{
       this.blogDetails = details;
     },err=>{
       console.log(err);
       
     })
  }

}
