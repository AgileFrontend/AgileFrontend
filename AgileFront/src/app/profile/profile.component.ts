import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../services/user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProfileService } from '../services/profile/profile.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name = new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(50)])
  surname = new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(50)])
  phoneNumber = new FormControl('', [Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(10)])
  email = new FormControl('', [Validators.email,Validators.maxLength(50)])
  bio = new FormControl('', [Validators.maxLength(500)])
  photo =  new FormControl('', Validators.maxLength(500))
  address = new FormControl('', [Validators.maxLength(100)])
  town = new FormControl('', [Validators.maxLength(50)])
  postalCode = new FormControl('', [Validators.maxLength(5)])

  profileForm = new FormGroup([this.name,this.surname,this.phoneNumber,this.email,this.bio, this.photo, this.address, this.town, this.postalCode])

  constructor(
    private profile: ProfileService,
    private auth : AuthService,
    private snackBar: MatSnackBar) {
  }



  formatProfileForm() {
    const user: User = {
      name: !this.name.value ? '' : this.name.value,
      surname: !this.surname.value ? '' : this.surname.value,
      phoneNumber: !this.phoneNumber.value ? '' : this.phoneNumber.value,
      email: !this.email.value ? '' : this.email.value,
      bio: !this.bio.value ? '' : this.bio.value,
      photoURL: !this.photo.value ? '' : this.photo.value,
      address: !this.address.value ? '' : this.address.value,
      town: !this.town.value ? '' : this.town.value,
      postalCode: !this.postalCode.value ? '' : this.postalCode.value,
    }
    return user
  }

  async onSubmitForm() {
    const userData = this.formatProfileForm()
    const currentUser = await this.auth.getCurrentUser()
    if(currentUser){
      await this.profile.updateUserData(userData, currentUser.uid)
      this.snackBar.open("Your profile has been successfully updated!", "Ok");
    }
  }


  // onFileSelected(event: any): void {
  //   this.profileImage = event.target.files[0];
  // }

  // getUserData() {
  //   const observer: Partial<Observer<DocumentSnapshot<DocumentData, DocumentData>>> = {
  //     next: (userSnapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
  //       const user = userSnapshot.data() as User;
  //       this.oldUserData = user;
  //       this.pushUserDataToView(user);
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     }
  //   };
  
  //   const userString = localStorage.getItem('user');
  
  //   if (userString) {
  //     const uid = JSON.parse(userString).uid;
  
  //     // Convert the Promise to an Observable using 'from'
  //     const userObservable: Observable<DocumentSnapshot<DocumentData, DocumentData>> = from(this.profile.getUserWithUID(uid));
  
  //     // Subscribe to the Observable
  //     userObservable.subscribe(observer);
  //   }
  // }

  // pushUserDataToView(user: User) {
  //   this.profilForm?.get('name')?.setValue(user.name);
  //   this.profilForm?.get('surname')?.setValue(user.surname);
  //   this.profilForm?.get('phoneNumber')?.setValue(user.phoneNumber);
  //   this.profilForm?.get('email')?.setValue(user.email);
  //   this.profilForm?.get('bio')?.setValue(user.bio);
  //   //this.pictureUrl? = user.photoURL;
  //   this.profilForm?.get('town')?.setValue(user.town);
  //   this.profilForm?.get('address')?.setValue(user.address);
  //   this.profilForm?.get('postalCode')?.setValue(user.postalCode);
  // }
}