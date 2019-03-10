import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
private posts: Post[] = [];
private postUpdated = new Subject<Post[]>();
constructor (private http: HttpClient) {}

getPosts() {
  this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
  .pipe(
    map((postsData) => {
      return postsData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
          };
      });
    })
  )
  .subscribe(transformedPosts => {
  this.posts = transformedPosts;
  this.postUpdated.next([...this.posts]);
});
}

getPostUpdated() {
  return this.postUpdated.asObservable();
}

addPost (title: string, content: string) {
  const post: Post = { id: null, title: title, content: content};
  this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', post)
  .subscribe((responseData) => {
    console.log('Message: ', responseData.message);
    post.id = responseData.id;
    this.posts.push(post);
    this.postUpdated.next(this.posts);
  });
  }

  getPost(id: string) {
    return {...this.posts.find(p => p.id === id)};
  }

  updatePost(id: string, title: string, content: string) {
    const post = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(result => console.log(result)
    );
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe( () => {
      const postUpdated = this.posts.filter(post => post.id !== postId);
      this.posts = postUpdated;
      this.postUpdated.next([...this.posts]);
      console.log('Deleted!');
    }
    );
  }
}
