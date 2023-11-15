/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../services/storage/storage.service";
import { User } from "../services/user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { from, Observable, Observer } from 'rxjs';
import { DocumentSnapshot } from 'firebase/firestore';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profilForm!: FormGroup;
  pictureUrl = '';
  profileImage: File | undefined;
  oldUserData: User = {
    uid: '',
    name: '',
    email: ''
  };
  checked = false;
  content: any; // Add this line

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private snackBack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.profilForm = this.fb.group({
      name: [''],
      surname: [''],
      bio: [''],
      phoneNumber: ['', [Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      town: [''],
      postalCode: [''],
    })

    this.getUserData();
  }

  profilOnSubmit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const uid = JSON.parse(userString).uid;
      this.storage.updateUserData(this.profilForm?.value, uid).then(
        () => {
          this.snackBack.open("Your profile has been successfully updated!", "Ok");
          this.ngOnInit();
        },
        (err: any) => {
          this.snackBack.open("There was an error updating your profile!", "Ok");
          console.log(err)
        }
      );
      if (this.profileImage !== undefined) {
        this.storage.uploadProfilePicture(this.profileImage)
      }
    }
  }

  onFileSelected(event: any): void {
    this.profileImage = event.target.files[0];
  }

  getUserData() {
    const observer: Partial<Observer<DocumentSnapshot<DocumentData, DocumentData>>> = {
      next: (userSnapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
        const user = userSnapshot.data() as User;
        this.oldUserData = user;
        this.pushUserDataToView(user);
      },
      error: (err: any) => {
        console.log(err);
      }
    };
  
    const userString = localStorage.getItem('user');
  
    if (userString) {
      const uid = JSON.parse(userString).uid;
  
      // Convert the Promise to an Observable using 'from'
      const userObservable: Observable<DocumentSnapshot<DocumentData, DocumentData>> = from(this.storage.getUserWithUID(uid));
  
      // Subscribe to the Observable
      userObservable.subscribe(observer);
    }
  }

  pushUserDataToView(user: User) {
    this.profilForm?.get('name')?.setValue(user.name);
    this.profilForm?.get('surname')?.setValue(user.surname);
    this.profilForm?.get('phoneNumber')?.setValue(user.phoneNumber);
    this.profilForm?.get('email')?.setValue(user.email);
    this.profilForm?.get('bio')?.setValue(user.bio);
    //this.pictureUrl? = user.photoURL;
    this.profilForm?.get('town')?.setValue(user.town);
    this.profilForm?.get('address')?.setValue(user.address);
    this.profilForm?.get('postalCode')?.setValue(user.postalCode);
  }
}