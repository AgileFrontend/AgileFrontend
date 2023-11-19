import { Component } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../services/post';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-project-page',
  templateUrl: './my-project-page.component.html',
  styleUrls: ['./my-project-page.component.scss'],
})
export class MyProjectPageComponent {
  posts$: Observable<Post[]>;
  currentUserId: string;
  constructor(private postService: PostService, private authService: AuthService) {
    this.posts$ = this.postService.readAllPost();
    this.currentUserId = '';
    this.init();
  }

  async init() {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser !== null) {
      this.currentUserId = currentUser.uid;
    }
  }
}
