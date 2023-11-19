import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../services/profile/profile.service';
import { AuthService } from '../services/auth/auth.service';
import {
  StorageService,
  requiredFileType,
} from '../services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  surname = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  occupation = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  phoneNumber = new FormControl('', [
    Validators.pattern('^[0-9]+$'),
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  email = new FormControl('', [Validators.email, Validators.maxLength(50)]);
  bio = new FormControl('', [Validators.maxLength(500)]);
  photo = new FormControl(null, [requiredFileType(['png', 'jpg', 'jpeg'])]);
  address = new FormControl('', [Validators.maxLength(100)]);
  town = new FormControl('', [Validators.maxLength(50)]);
  postalCode = new FormControl('', [Validators.maxLength(5)]);
  imageSrc: File | null = null;
  imageUrl = '';
  profilePicture = '';

  profileForm = new FormGroup({
    name: this.name,
    surname: this.surname,
    occupation: this.occupation,
    phoneNumber: this.phoneNumber,
    email: this.email,
    bio: this.bio,
    photo: this.photo,
    address: this.address,
    town: this.town,
    postalCode: this.postalCode,
  });

  constructor(
    private profile: ProfileService,
    private auth: AuthService,
    private storage: StorageService,
    private snackBar: MatSnackBar,
  ) {
    this.pushCurrentUserDataToView();
  }

  formatProfileForm() {
    const user: User = {
      name: !this.name.value ? '' : this.name.value,
      surname: !this.surname.value ? '' : this.surname.value,
      occupation: !this.occupation.value ? '' : this.occupation.value,
      phoneNumber: !this.phoneNumber.value ? '' : this.phoneNumber.value,
      email: !this.email.value ? '' : this.email.value,
      bio: !this.bio.value ? '' : this.bio.value,
      photoURL: !this.imageUrl ? '' : this.imageUrl,
      address: !this.address.value ? '' : this.address.value,
      town: !this.town.value ? '' : this.town.value,
      postalCode: !this.postalCode.value ? '' : this.postalCode.value,
    };
    return user;
  }

  async onSubmitForm() {
    const userData = this.formatProfileForm();
    console.log(userData);
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser) {
      await this.profile.updateUserData(userData, currentUser.uid);
      this.snackBar.open('Your profile has been successfully updated!', 'Ok');
    }
  }

  async onFileSelected(event: Event) {
    const currentUser = await this.auth.getCurrentUser();
    if (event !== null && currentUser !== null) {
      const target = event.target as HTMLInputElement;
      if (target.files != null) {
        this.imageSrc = target.files[0];
        const uploadResult = await this.storage.createFile(
          this.imageSrc,
          'profile-pictures/' + currentUser.uid,
        );
        this.imageUrl = await this.storage.readFileFromRef(uploadResult.ref);
        this.profilePicture = this.imageUrl;
      }
    }
  }

  async pushCurrentUserDataToView() {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser !== null) {
      const documentSnapshot = await this.profile.getUserWithUID(
        currentUser.uid,
      );
      const userData = documentSnapshot.data() as User;
      this.profileForm?.get('name')?.setValue(userData.name);
      this.profileForm?.get('surname')?.setValue(userData.surname);
      this.profileForm?.get('occupation')?.setValue(userData.occupation);
      this.profileForm?.get('phoneNumber')?.setValue(userData.phoneNumber);
      this.profileForm?.get('email')?.setValue(userData.email);
      this.profileForm?.get('bio')?.setValue(userData.bio);
      this.profileForm?.get('town')?.setValue(userData.town);
      this.profileForm?.get('address')?.setValue(userData.address);
      this.profileForm?.get('postalCode')?.setValue(userData.postalCode);
      this.profilePicture = userData.photoURL;
    }
  }
}
