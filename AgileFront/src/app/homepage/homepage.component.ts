import { Component } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../services/post';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  posts$: Observable<Post[]>;
  constructor(
    private postService: PostService,

  ) {
    this.posts$ = this.postService.readAllPost();
  }
}
