import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { User as UserFirestore } from '../user';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private auth: Auth,
    private store: Firestore,
  ) {
    this.auth = getAuth();
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const result = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    return new Promise((resolve, reject) => {
      try {
        const user = result.user;
        const userData: UserFirestore = {
          email: user.email == null ? '' : user.email,
          name: '',
          surname: '',
          occupation: '',
          phoneNumber: '',
          bio: '',
          photoURL: '',
          address: '',
          town: '',
          postalCode: '',
        };
        this.createUser(userData, user.uid).catch((err) => console.error(err));
        resolve(user);
      } catch (error) {
        if (error) {
          reject(error);
        }
      }
    });
  }

  async createUser(user: UserFirestore, uid: string) {
    const docRef = doc(this.store, 'users', uid);
    const result = await setDoc(docRef, user, { merge: true });
    return result;
  }
}
