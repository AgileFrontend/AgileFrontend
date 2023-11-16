import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { PostService } from '../services/post/post.service';
import { Post } from '../services/post';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  posts: Post[] = []
  constructor(private postService : PostService, private post : ProjectComponent){
    this.fetchAllPost()
  }

  fetchAllPost() {
    this.postService.readAllPost().subscribe(
      posts => this.posts = posts
    )
  }
}
