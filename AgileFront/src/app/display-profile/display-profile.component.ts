import { DisplayProfileService } from '../services/display-profile/display-profile.service';
import { User } from '../services/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { PostService } from '../services/post/post.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss'],
})
export class DisplayProfileComponent {
  editButtonAvailable = false;
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
  postsTitleAndURL: PostTitleAndURL[] = [];
  constructor(
    private auth: AuthService,
    private displayProfile: DisplayProfileService,
    private post: PostService,
    private route: ActivatedRoute,
  ) {
    const userID = this.route.snapshot.paramMap.get('id');
    if (userID == 'me') {
      this.editButtonAvailable = true;
      this.auth.getCurrentUser().then((user) => {
        if (user) {
          this.pushUserDataToView(user.uid);
          this.pushPostsToView(user.uid).subscribe((posts) => {
            this.postsTitleAndURL = posts;
          });
        }
      });
    }
    if (userID && userID !== 'me') {
      this.editButtonAvailable = false;
      this.pushUserDataToView(userID);
      this.pushPostsToView(userID).subscribe((posts) => {
        this.postsTitleAndURL = posts;
      });
    }
  }

  async pushUserDataToView(userID: string) {
    const documentSnapshot = await this.displayProfile.getUserWithUID(userID);
    const userData = documentSnapshot.data() as User;
    this.user.name = userData.name;
    this.user.surname = userData.surname;
    this.user.occupation = userData.occupation;
    this.user.phoneNumber = userData.phoneNumber;
    this.user.email = userData.email;
    this.user.bio = userData.bio;
    this.user.town = userData.town;
    this.user.address = userData.address;
    this.user.postalCode = userData.postalCode;
    this.user.photoURL = userData.photoURL;
  }

  pushPostsToView(userID: string): Observable<PostTitleAndURL[]> {
    return this.post.readAllPostWithUserID(userID).pipe(
      map((posts) => {
        const postsTitleAndURL: PostTitleAndURL[] = posts.map((post) => ({
          title: post.title,
          url: window.location.origin + '/post?id=' + post.postId,
        }));
        return postsTitleAndURL;
      }),
    );
  }
}

export interface PostTitleAndURL {
  title: string | undefined;
  url: string;
}
