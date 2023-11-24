import { Injectable } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { PostComment } from '../../comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
  ) {}

  //Create a new message in a given conversation
  async createComment(comment: PostComment, PostID: string) {
    return await addDoc(
      collection(this.firestore, '/posts/' + PostID + '/comments'),
      comment,
    );
  }

  //Read a given message
  async readComment(CommentRef: DocumentReference) {
    return await getDoc(CommentRef);
  }

  //Update a give message+45
  async updateComment(CommentRef: DocumentReference, field: object) {
    return await updateDoc(CommentRef, field);
  }

  //Delete a given message
  async deleteComment(CommentRef: DocumentReference) {
    return await deleteDoc(CommentRef);
  }

  async AddCommentToPost(
    commentValue: { commentToSend: string },
    postID: string,
  ) {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser !== null) {
      const comment = {
        content: commentValue.commentToSend,
        userId: currentUser.uid,
        sentDate: Timestamp.now(),
      };
      this.createComment(comment, postID);
    }
  }

  readAllCommentFromPostId(PostId: string) {
    const q = query(
      collection(this.firestore, '/posts/' + PostId + '/comments'),
      orderBy('sentDate'),
    );
    return collectionData(q) as Observable<PostComment[]>;
  }
}
