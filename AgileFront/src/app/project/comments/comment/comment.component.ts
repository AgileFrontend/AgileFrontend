import { Component, Input, OnChanges } from '@angular/core';
import { PostComment } from 'src/app/services/comment';
import { DisplayProfileService } from 'src/app/services/display-profile/display-profile.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnChanges {
  @Input() comment!: PostComment;
  user: User = {
    name: '',
    surname: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    bio: '',
    photoURL: '',
    address: '',
    town: '',
    postalCode: '',
  };

  constructor(private displayUserService: DisplayProfileService) {}

  ngOnChanges(): void {
    if (this.comment != undefined) {
      this.displayUserService
        .getUserWithUID(this.comment.userId)
        .then((snapshot) => {
          this.user = snapshot.data() as User;
        });
    }
  }
}
