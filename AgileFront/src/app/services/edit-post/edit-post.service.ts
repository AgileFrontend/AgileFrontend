import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(
    private firestore: Firestore,
    private storage : StorageService
  ) { }

  getPostData(postid:string){
    return getDoc(doc(this.firestore, 'posts', postid));
  }

  async updatePostData(postData: object, postid: string, postImage: Blob | null) {
    const postDocRef = doc(this.firestore, 'posts', postid);
    if (postImage != null) {
      //Check if it had a file
      const uploadResult = await this.storage.createFile(
        postImage,
        'posts/' + postid,
      );
      const imageURL = await this.storage.readFileFromRef(
        uploadResult.ref,
      );

      await setDoc(postDocRef, {imageURL: imageURL}, { merge: true });
    }
    return setDoc(postDocRef, postData, { merge: true });
  }
}
