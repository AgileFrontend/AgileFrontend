import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/post/comment/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  @Input() postId!: string;
  commentToSend: FormControl;
  commentForm: FormGroup;

  constructor(private commentService: CommentService) {
    this.commentToSend = new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(200),
      Validators.required,
    ]);
    this.commentForm = new FormGroup({
      commentToSend: this.commentToSend,
    });
  }

  onSubmit() {
    console.log(this.commentToSend.status);
    if (this.commentForm.valid) {
      this.commentService.AddCommentToPost(this.commentForm.value, this.postId);
      this.commentForm.setValue({ commentToSend: '' });
    }
  }
}
