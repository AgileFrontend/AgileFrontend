import { Component } from '@angular/core';
import { Post } from "../services/post"
import { StorageService } from '../services/storage/storage.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-create.post',
  templateUrl: './create.post.component.html',
  styleUrls: ['./create.post.component.scss'],
})
export class CreatePostComponent {

  title: string;
  body: string;
  photoURL: string;
  userId: string;
  postId: string;

  constructor(public storageService: StorageService) {
    this.title ='';
    this.body='';
    this.photoURL='';
    this.userId='';
    this.postId='';
   }

  addPost(title: string,body: string,photoURL: string,userId: string, postId:string){
    this.storageService.addPost({
      title,
      body,
      photoURL,
      userId,
      postId
    })
  }
}
