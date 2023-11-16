import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  DocumentReference,
  getDoc,
} from '@angular/fire/firestore';
import { Post } from '../post';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    public firestore: Firestore,
    public authService: AuthService,
    public storageService: StorageService,
  ) {}

  async createPost(post: Post) {
    return await addDoc(collection(this.firestore, 'posts'), post);
  }

  async readPost(messageRef: DocumentReference) {
    return await getDoc(messageRef);
  }

  async updatePost(messageRef: DocumentReference, field: object) {
    return await updateDoc(messageRef, field);
  }

  async deleatePost(messageRef: DocumentReference) {
    return await deleteDoc(messageRef);
  }

  async addPost(
    addPostValue: Partial<{
      title: string;
      body: string;
    }>,
    postImage: Blob | null,
  ) {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser !== null) {
      const post: Post = {
        title: addPostValue.title,
        body: addPostValue.body,
        photoURL: '',
        userId: currentUser.uid,
      };
      const postRef = await addDoc(collection(this.firestore, 'posts'), post); //Create the post

      if (postImage != null) {
        //Check if it had a file
        const uploadResult = await this.storageService.createFile(
          postImage,
          'posts/' + postRef.id.toString(),
        );
        post.photoURL = await this.storageService.readFileFromRef(
          uploadResult.ref,
        );
        await this.updatePost(postRef, {
          photoURL: post.photoURL.toString(),
        });
      }
    } else {
      console.log('The user is not logged in!');
    }
  }
}
