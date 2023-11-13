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
  updateDoc,  } from '@angular/fire/firestore'; //Doublecheck this import statement
import { AuthService } from '../auth/auth.service'
@Injectable({
  providedIn: 'root'
})
export class InstantMessagingService {

  constructor(private firestore :Firestore, private auth : AuthService) { }

  async createMessage(message : Message){
    return await addDoc(collection(this.firestore,"conversations"),message) 
  }

  async readMessage(messageRef : DocumentReference){
    return await getDoc(messageRef)
  }

  async updateMessage(messageRef : DocumentReference,message : Message){
    return await updateDoc(messageRef,{message})
  }

  async deleateMessage(messageRef: DocumentReference){
    return await deleteDoc(messageRef)
  }



}
