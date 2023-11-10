import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-create.post',
  templateUrl: './create.post.component.html',
  styleUrls: ['./create.post.component.scss'],
})
export class CreatePostComponent {
  addPostForm = new FormGroup(
    {
    title: new FormControl<string>('',{
      nonNullable : true,
      validators :[
      Validators.required,
      Validators.maxLength(150)
    ]}),
    body: new FormControl<string>('',{
      nonNullable : true,
      validators :[
      Validators.required,
      Validators.maxLength(500)
    ]}),
    file: new FormControl<Blob|null>(null),
    }
  );

  constructor(public storageService: StorageService) {

  }

  onSubmit() {
    console.log(this.addPostForm.value)
    this.storageService.addPost(this.addPostForm.value)
 }
}
