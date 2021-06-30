import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _http: HttpClient
  ) { }

  writeBlog(blog:{title:string,text:string}):Observable<any>{
    return this._http.post('http://localhost:3000/blog/write',blog)
  }
  getAllBlogs():Observable<any>{
    return this._http.get('http://localhost:3000/blog/allBlogs')
  }
  getBlogDetails(blogId:string):Observable<any>{
    return this._http.get(`${environment.api_url}/blog/${blogId}`);
  }
  deleteBlog(blogId:string):Observable<any>{
    return this._http.delete(`${environment.api_url}/blog/${blogId}`);
  }
}
