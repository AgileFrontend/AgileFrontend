import { Injectable } from '@angular/core';
import { Conversation } from '../conversation';
import { Message } from '../message';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
  collectionData,
  getDocs,
  Timestamp,
  orderBy,
} from '@angular/fire/firestore'; //Doublecheck this import statement

import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InstantMessagingService {
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
  ) {}

  //Create a new conversation
  async createConversation(conversation: Conversation) {
    return await addDoc(
      collection(this.firestore, 'conversations'),
      conversation,
    );
  }

  //Return a given conversation data
  async readConversation(conversationRef: DocumentReference) {
    return await getDoc(conversationRef);
  }

  async updateConversation(conversationRef: DocumentReference, field: object) {
    return await updateDoc(conversationRef, field);
  }

  async deleteConversation(conversationRef: DocumentReference) {
    return await deleteDoc(conversationRef);
  }

  //Create a new message in a given conversation
  async createMessage(message: Message, conversationID: string) {
    return await addDoc(
      collection(
        this.firestore,
        '/conversations/' + conversationID + '/messages',
      ),
      message,
    );
  }

  //Read a given message
  async readMessage(messageRef: DocumentReference) {
    return await getDoc(messageRef);
  }

  //Update a give message+45
  async updateMessage(messageRef: DocumentReference, field: object) {
    return await updateDoc(messageRef, field);
  }

  //Delete a given message
  async deleteMessage(messageRef: DocumentReference) {
    return await deleteDoc(messageRef);
  }

  async readAllUserConversation(userID: string) {
    const q = query(
      collection(this.firestore, 'conversations'),
      where('userIDs', 'array-contains', userID),
    );
    return await getDocs(q);
  }

  readAllMessagesFromConversationID(ConversationID: string) {
    const q = query(
      collection(
        this.firestore,
        '/conversations/' + ConversationID + '/messages',
      ),
      orderBy('sentDate'),
    );
    return collectionData(q) as Observable<Message[]>;
  }

  async AddMessageToConv(
    messageValue: { messageToSend: string },
    conversationID: string,
    conversationData: Conversation,
  ) {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser !== null) {
      const message = {
        senderID: currentUser.uid,
        recieverIDs: conversationData.userIDs.filter((userIds) => {
          return userIds !== currentUser.uid;
        }),
        sentDate: Timestamp.now(),
        content: messageValue.messageToSend,
      };
      this.createMessage(message, conversationID);
    }
  }


  createConversationFormUserID(userID : string,convName : string){
    this.auth.getCurrentUser().then(
      (currentUser) => {
        if (currentUser != null){
          const newConv = {
            conversationName: convName,
            userIDs: [userID,currentUser.uid],
            messages: []
          }
          this.createConversation(newConv)
        }
      }
    )
    
  }
}
