import { Injectable } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Post } from '../services/post';
import { PostService } from '../services/post/post.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})



export class ProjectComponent {

  constructor(private storagePost: PostService){}
  
  @Input() post!: Post;


}
