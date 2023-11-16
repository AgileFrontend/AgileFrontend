import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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
    return updateDoc(userDocRef, {...userData});
  }

  getUserWithUID(uid: string) {
    return getDoc(doc(this.firestore, 'users', uid));
  }

  uploadProfilePicture(img: File) {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: { uid: string } = JSON.parse(userString);
      // this is not the original code, but still doesnt work in this angular version
      
      /*const storageRef: AngularFireStorageReference = ref(this.storage, `/users/${user.uid}`);
      const uploadTask: AngularFireUploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          this.updateUserPhotoURL(user.uid, downloadURL);
        });
      });*/
    }
  }

  private updateUserPhotoURL(uid: string, downloadURL: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, { photoURL: downloadURL }, { merge: true });
  }
}
