import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    public firestore: Firestore,
    public storage: Storage,
  ) { }

  updateUserData(userData: any, uid: any) { //not using User type as some part might not be updated
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, userData, { merge: true });
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
