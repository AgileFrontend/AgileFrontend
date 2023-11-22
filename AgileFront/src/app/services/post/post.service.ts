import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  DocumentReference,
  collectionData,
  getDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from '@angular/fire/firestore';
import { Post } from '../post';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';

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

  readAllPost() {
    const postsCollection = collection(this.firestore, 'posts');
    const postsQuery = query(postsCollection, orderBy('date'));
    return collectionData(postsQuery) as Observable<Post[]>;
  }

  readAllPostWithUserID(userId: string) {
    const postsCollection = collection(this.firestore, 'posts');
    const postsQuery = query(postsCollection, where('userId', '==', userId));
    return collectionData(postsQuery) as Observable<Post[]>;
  }

  async retrieveUserId() {
    return await this.authService.getCurrentUser();
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
        imageURL: '',
        userId: currentUser.uid,
        postId: '',
        date: Timestamp.now().seconds,
        likes: new Array<string>(),
      };
      const postRef = await addDoc(collection(this.firestore, 'posts'), post); //Create the post
      await this.updatePost(postRef, { postId: postRef.id.toString() });
      if (postImage != null) {
        //Check if it had a file
        const uploadResult = await this.storageService.createFile(
          postImage,
          'posts/' + postRef.id.toString(),
        );
        post.imageURL = await this.storageService.readFileFromRef(
          uploadResult.ref,
        );

        await this.updatePost(postRef, {
          imageURL: post.imageURL.toString(),
        });
      }
    } else {
      console.log('The user is not logged in!');
    }
  }
}
