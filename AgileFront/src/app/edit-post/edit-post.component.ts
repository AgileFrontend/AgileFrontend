import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../services/post';
import { EditPostService } from '../services/edit-post/edit-post.service';
import { StorageService, requiredFileType} from '../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent {
  editPostForm = new FormGroup({
    title : new FormControl<string>('', {
      nonNullable: true,
      validators : [Validators.required, Validators.minLength(1), Validators.maxLength(150),]
    }
    ),
    body : new FormControl<string>('', {
      nonNullable: true,
      validators : [Validators.required, Validators.minLength(1), Validators.maxLength(500),]
    }),
    photo : new FormControl(null, [requiredFileType(['png', 'jpg', 'jpeg'])])
  });

  imageURL: string;
  userId: string;
  postId?: string;
  date: number;
  likes: Array<string>;

  constructor(
    private editService : EditPostService,
    private storage: StorageService,
    private route: ActivatedRoute,
    ){
    this.pushCurrentPostDataToView();
  }

  async onSubmitForm() {
    const postData : Post = {
      title : this.editPostForm.controls.title ? '' : this.editPostForm.controls.title,

    }
  }

  async pushCurrentPostDataToView(){
    const identifier = this.route.snapshot.queryParamMap.get('id');
    const documentSnapshot = await this.editService.getPostData(identifier);
    const postData = documentSnapshot.data() as Post;
      this.editPostForm?.get('title')?.setValue(postData.title);
      this.editPostForm?.get('body')?.setValue(postData.body);
      this.editPostForm?.get('photo')?.setValue(postData.imageURL);
      this.imageURL = postData.imageURL;
      this.userId = postData.userId;
      this.postId = postData.postId;
      this.date = postData.date;
      this.likes = postData.likes;
  }
}
