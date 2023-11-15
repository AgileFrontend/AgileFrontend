import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private auth: Auth) {
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
        resolve(user);
      } catch (error) {
        if (error) {
          reject(error);
        }
      }
    })
  }
}
