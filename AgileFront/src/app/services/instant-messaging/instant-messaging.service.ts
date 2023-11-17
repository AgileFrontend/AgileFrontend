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
  collectionData} from '@angular/fire/firestore'; //Doublecheck this import statement

import {AuthService} from '../auth/auth.service'
import { get } from 'http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstantMessagingService {

  constructor(private firestore :Firestore, private auth : AuthService) {
   
   }
  
  
  //Create a new conversation
  async createConversation(conversation: Conversation){
    return await addDoc(collection(this.firestore,"conversations"),conversation)
  }

   //Return a given conversation data
  async readConversation(conversationRef: DocumentReference){
    return await getDoc(conversationRef)
  }

  async updateConversation(conversationRef: DocumentReference, field : object){
    return await updateDoc(conversationRef,field)
  }

  async deleteConversation(conversationRef: DocumentReference){
    return await deleteDoc(conversationRef)
  }
 
  //Create a new message in a given conversation
  async createMessage(message : Message, conversationRef: DocumentReference){
    return await addDoc(collection(conversationRef,"messages"),message) 
  }

  //Read a given message
  async readMessage(messageRef : DocumentReference){
    return await getDoc(messageRef)
  }

  //Update a give message
  async updateMessage(messageRef : DocumentReference,field : object){
    return await updateDoc(messageRef,field)
  }

  //Delete a given message
  async deleteMessage(messageRef: DocumentReference){
    return await deleteDoc(messageRef)
  }

  async readAllCurrentUserConversation(){
    const currentUser = await this.auth.getCurrentUser()
    let userID = ''
    if (currentUser != null){
      userID = currentUser.uid
    }  
    const q = query(collection(this.firestore,"conversations"),where("userIDs","array-contains",userID))
      return collectionData(q) as Observable<Conversation[]>   
  }





}
