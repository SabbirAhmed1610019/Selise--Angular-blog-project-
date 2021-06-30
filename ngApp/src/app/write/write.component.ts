import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  blog={
    title:'',
    text:''
  }
  writeBlogSub: Subscription | undefined;
  error:string='';
  constructor(private _router: Router,
    private _blogService: BlogService) { }

  ngOnInit(): void {
  }
  writeBlog(){
    this.error='';
    if (!this.blog.title || !this.blog.text) {
      this.error = 'Title & text must not be empty'
    }else{
      this.writeBlogSub=this._blogService.writeBlog(this.blog)
      .subscribe(res=>{
        console.log('Blog Posted Succesfully');
        this._router.navigate(['/blog',res._id])
        this.writeBlogSub?.unsubscribe();
      },
      err=>{
        console.log(err);
        this.error=err.error.message;
        
      })
    }
  }

}
