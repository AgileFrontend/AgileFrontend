import { Injectable } from '@angular/core';
import { Post } from "../post";
import { Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public firestore: Firestore) { }

  async addPost(post : Post){
    const postRef = await addDoc(collection(this.firestore,"posts"),post);
    
    console.log("Document written with ID: ", postRef.id);
    updateDoc(postRef,{
      postId : postRef.id
    })
  }
}


