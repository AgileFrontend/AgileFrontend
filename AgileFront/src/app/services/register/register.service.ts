import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private auth : Auth
  ) {
    this.auth = getAuth();
  }

  async createUserWithEmailAndPassword(email:string, password:string): Promise<User | Error | undefined>{ 
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)
      const user = result.user
      return user
    } catch(error) {
      if (error instanceof Error) {
        return error
      }
      else {
        return undefined
      }
    }  
  }
}