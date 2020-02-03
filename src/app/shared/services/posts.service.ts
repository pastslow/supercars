import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPosts() {
    return this.http.get('http://localhost:3000/api/posts');
  }

  public addPost(post) {
    return this.http.post('http://localhost:3000/api/posts', post);
  }

  public getCars() {
    return this.http.get('http://localhost:3000/api/cars');
  }
}
