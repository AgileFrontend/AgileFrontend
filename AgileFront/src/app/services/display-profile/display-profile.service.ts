import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DisplayProfileService {
  constructor(private firestore: Firestore) {}

  getUserWithUID(uid: string) {
    return getDoc(doc(this.firestore, 'users', uid));
  }
}
