import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-post',
  templateUrl: './create.post.component.html',
  styleUrls: ['./create.post.component.scss'],
})
export class CreatePostComponent {
  panelOpenState = false;
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
  postImage: File | null = null;

  onFileSelected(event: Event): void {
    if (event != null) {
      const target = event.target as HTMLInputElement;
      if (target.files != null) {
        this.postImage = target.files[0];
      }
    }
  }

  constructor(
    public postService: PostService,
    private snackBar: MatSnackBar,
  ) {}

  onSubmit() {
    if (this.addPostForm.valid) {
      this.postService.addPost(this.addPostForm.value, this.postImage);
      this.addPostForm.setValue({ title: '', body: '' });
      this.snackBar.open('Your post has been sucessfully created', 'Ok');
      this.panelOpenState = false;
    }
  }
}
