import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-create.post',
  templateUrl: './create.post.component.html',
  styleUrls: ['./create.post.component.scss'],
})
export class CreatePostComponent {
  addPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(150)],
    }),
    body: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
  });
  postImage = null 

  //I know this isn't the best way to do it, couldn't make it otherwise sooooo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event:any): void {
    this.postImage = event.target.files[0];
  }

  constructor(public postService: PostService) {}

  onSubmit() {
    this.postService.addPost(this.addPostForm.value,this.postImage);
  }
}
