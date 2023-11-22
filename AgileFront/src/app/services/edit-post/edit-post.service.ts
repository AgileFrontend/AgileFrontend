import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(
    private firestore: Firestore,
  ) { }

  getPostData(postid:string){
    return getDoc(doc(this.firestore, 'posts', postid));
  }

  updatePostData(postData: object, postid: string) {
    const postDocRef = doc(this.firestore, 'posts', postid);
    return setDoc(postDocRef, postData, { merge: true });
  }
}
