import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { Post } from '../services/post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class ProjectComponent {
  constructor(private storagePost : PostService){}
  
  @Input() post!: Post;
}
