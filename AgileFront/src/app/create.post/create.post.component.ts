import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create.post',
  templateUrl: './create.post.component.html',
  styleUrls: ['./create.post.component.css']
})
export class CreatePostComponent implements OnInit {
  // @ts-ignore
  postImage:File;
  // @ts-ignore
  postText:string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
  }

  onFileSelected(event:any): void {
    this.postImage = event.target.files[0];
  }

  // addPost(){
  //   this.storage.uploadPost(this.postText,this.postImage);
  //   this.snackBar.open("Vos poste a bien été ajouté ! ","Ok");
  //   let currentUrl = this.router.url;
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate([currentUrl]);
  // }
}