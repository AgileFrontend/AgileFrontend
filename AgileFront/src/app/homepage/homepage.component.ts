import { Component } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../services/post';
import { Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  sortOption = '';
  selectedOptionControl = new FormControl(this.sortOption);
  posts$: Observable<Post[]>;
  constructor(private postService: PostService) { 
    this.posts$ = this.postService.readAllPost();
  }


  sortAsc(){
    this.posts$ = this.posts$.pipe(map((posts) => {
      posts.sort((a, b) => {
        return a.date < b.date ? -1 : 1;
     });
    return posts;
    }))
  }

  sortDesc(){
    this.posts$ = this.posts$.pipe(map((posts) => {
      posts.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
     });
    return posts;
    }))
  }

  sortLikeDesc(){
    this.posts$ = this.posts$.pipe(map((posts) => {
      posts.sort((a, b) => {
        return a.likes.length > b.likes.length ? -1 : 1;
     });
    return posts;
    }))
  }

  sortLikeAsc(){
    this.posts$ = this.posts$.pipe(map((posts) => {
      posts.sort((a, b) => {
        return a.likes.length < b.likes.length ? -1 : 1;
     });
    return posts;
    }))
  }
  
  

  // Function to track posts by post id
  trackByPost(index: number, post: Post): string {
    return post.postId ? post.postId : '';
  }


}
