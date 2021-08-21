import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post, UserInfo } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  private baseUri: string = 'https://jsonplaceholder.typicode.com/';
  private usersUri: string = this.baseUri + 'users';
  private postsUri: string = this.baseUri + 'posts';

  constructor(private httpClient: HttpClient) {}

  getUserInfo(email: string): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(this.usersUri + '?email=' + email);
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postsUri + '?userId=' + userId);
  }

  getOtherUsersInfo(): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(this.usersUri);
  }

  getOtherPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postsUri);
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.postsUri, {
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
  }
}
