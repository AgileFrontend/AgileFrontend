import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../services/post';
import { EditPostService } from '../services/edit-post/edit-post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit{
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
  });

  identifier = '';

  constructor(
    private editService : EditPostService,
    private route : ActivatedRoute
    ){
      
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.identifier = params['id'];
  });
    this.pushCurrentPostDataToView(this.identifier);  
  }

  onSubmitForm() {
    const post = {
      title : this.editPostForm?.get('title')?.value,
      body : this.editPostForm?.get('body')?.value
    }
    this.editService.updatePostData(post,this.identifier)
  }

  async pushCurrentPostDataToView(identifier: string){
    const documentSnapshot = await this.editService.getPostData(identifier);
    const postData = documentSnapshot.data() as Post;
    if(postData.title && postData.body){
      this.editPostForm?.get('title')?.setValue(postData.title);
      this.editPostForm?.get('body')?.setValue(postData.body);
    }
  }
}
