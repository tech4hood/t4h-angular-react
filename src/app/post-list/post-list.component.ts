import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post/post.model';
import { PostService } from '../post/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
// posts = [
//   {title: 'First Post', content: 'This is the first post\'s content'},
//   {title: 'Second Post', content: 'This is the second post\'s content'},
//   {title: 'Third Post', content: 'This is the third post\'s content'}
// ];
posts: Post[] = [];
postSubs: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSubs = this.postService.getPostUpdated().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(PostId: string) {
    this.postService.deletePost(PostId);
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
  }
}
