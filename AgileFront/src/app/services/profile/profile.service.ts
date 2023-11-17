import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  Storage,
} from '@angular/fire/storage';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  updateUserData(userData: User, uid: string) {
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, {...userData}, {merge:true});
  }

  getUserWithUID(uid: string) {
    return getDoc(doc(this.firestore, 'users', uid));
  }
}
