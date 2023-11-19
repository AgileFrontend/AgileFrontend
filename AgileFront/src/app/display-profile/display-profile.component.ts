import { Component } from '@angular/core';
import { DisplayProfileService } from '../services/display-profile/display-profile.service';
import { User } from '../services/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss']
})
export class DisplayProfileComponent {
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
    postalCode: ''
  };
  constructor(private auth: AuthService, private displayProfile : DisplayProfileService, private route : ActivatedRoute){
    const userID = this.route.snapshot.paramMap.get('id');
    if (userID == "me") {
      this.auth.getCurrentUser()
      .then((user) => {
        if(user) {
          this.pushUserDataToView(user.uid)
        }
      }
      )
    }
    if (userID) {
      this.pushUserDataToView(userID)
    }
  }

  async pushUserDataToView(userID: string) {
      const documentSnapshot = await this.displayProfile.getUserWithUID(
        userID,
      );
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
}

