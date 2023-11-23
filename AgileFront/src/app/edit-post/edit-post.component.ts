import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../services/post';
import { EditPostService } from '../services/edit-post/edit-post.service';
import { ActivatedRoute } from '@angular/router';
import { requiredFileType } from '../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ],
    }),
    body: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ],
    }),
    imageURL: new FormControl(null, [requiredFileType(['png', 'jpg', 'jpeg'])]),
  });

  postImage: File | null = null;

  identifier = '';

  constructor(
    private editService: EditPostService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.identifier = params['id'];
    });
    this.pushCurrentPostDataToView(this.identifier);
  }

  onSubmitForm() {
    const post = {
      title: this.editPostForm?.get('title')?.value,
      body: this.editPostForm?.get('body')?.value,
    };
    this.editService.updatePostData(post, this.identifier, this.postImage);
    this.snackBar.open('Your post has been successfully updated!', 'Ok');
    this.location.back();
  }

  async pushCurrentPostDataToView(identifier: string) {
    const documentSnapshot = await this.editService.getPostData(identifier);
    const postData = documentSnapshot.data() as Post;
    if (postData.title && postData.body) {
      this.editPostForm?.get('title')?.setValue(postData.title);
      this.editPostForm?.get('body')?.setValue(postData.body);
    }
  }

  onFileSelected(event: Event): void {
    if (event != null) {
      const target = event.target as HTMLInputElement;
      if (target.files != null) {
        this.postImage = target.files[0];
      }
    }
  }
}
