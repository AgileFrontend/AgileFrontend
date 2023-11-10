import { Injectable } from '@angular/core';
import { Post } from '../post';
import {
  Firestore,
  addDoc,
  collection,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    public firestore: Firestore,
    public storage: Storage,
  ) {}

  async addFile(file: Blob, filename: string) {
    const storageRef = ref(this.storage, filename);
    uploadBytes(storageRef, file).then(() => {
      console.log('Uploaded the immage sucessfuly!');
    });
  }
  //Will check later, for no it works
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addPost(addPostValue: any) {
    const post: Post = {
      title: addPostValue.title,
      body: addPostValue.body,
      photoURL: '',
      userId: 'defaultuserID',
      postId: '',
    };

    const postRef = await addDoc(collection(this.firestore, 'posts'), post);
    if (addPostValue.file != null) {
      await this.addFile(addPostValue.file, 'posts/' + postRef.id.toString);
      getDownloadURL(ref(this.storage, 'posts/' + postRef.id)).then((url) => {
        updateDoc(postRef, {
          postId: postRef.id,
          photoURL: url,
        });
      });
    } else {
      updateDoc(postRef, {
        postId: postRef.id,
      });
    }
  }
}
