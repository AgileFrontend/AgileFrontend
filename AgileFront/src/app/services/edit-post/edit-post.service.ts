import { Injectable } from '@angular/core';
import { Post } from '../post';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
  ) { }

  getPostData(postid:string){
    return getDoc(doc(this.firestore, 'posts', postid));
  }

  updatePostData(postData: Post, postid: string) {
    const postDocRef = doc(this.firestore, 'posts', postid);
    return setDoc(postDocRef, { ...postData }, { merge: true });
  }
}
