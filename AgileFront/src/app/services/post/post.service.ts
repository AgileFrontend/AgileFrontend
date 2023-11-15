import { Injectable } from '@angular/core';
import { Firestore, addDoc, updateDoc, deleteDoc, collection, DocumentReference, getDoc } from '@angular/fire/firestore';
import { Post } from '../post';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public firestore: Firestore,
    public authService : AuthService,
    public storageService : StorageService
  ) { }


  async createPost(post : Post){
    return await addDoc(collection(this.firestore,"posts"),post) 
  }

  async readPost(messageRef : DocumentReference){
    return await getDoc(messageRef)
  }

  async updatePost(messageRef : DocumentReference,post : Post){
    return await updateDoc(messageRef,{post})
  }

  async deleatePost(messageRef: DocumentReference){
    return await deleteDoc(messageRef)
  }

  //Will check later, for no it works
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addPost(addPostValue: any) {
    this.authService.getCurrentUser().then( async(currentUser) => { //Check current user
      if (currentUser != undefined) {

        const post: Post = {
          title: addPostValue.title,
          body: addPostValue.body,
          photoURL: '',
          userId: currentUser.uid
        };
        const postRef = await addDoc(collection(this.firestore, 'posts'), post); //Create the post

        if (addPostValue.file != null) { //Check if it had a file
          const uploadResult = await this.storageService.createFile(addPostValue.file, 'posts/' + postRef.id.toString)
          post.photoURL = await this.storageService.readFileFromRef(uploadResult.ref)
          await this.updatePost(postRef,post)
          return
        } else {return}
        
      }else{
        console.log("The user is not logged in!")
      }
    });
  }
}
