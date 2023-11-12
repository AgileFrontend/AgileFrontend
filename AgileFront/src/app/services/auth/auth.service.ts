import { Injectable, inject} from '@angular/core'
import { User } from '../user'
import { Auth } from '@angular/fire/auth'
import { CanActivateFn, Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  currentUser : User | undefined
  constructor(
    private auth : Auth,
    private router : Router,
    ){}
  
  // Returns a user if logged in, else return undefined
  async getCurrentUser(): Promise<User | undefined> {
    await this.auth.authStateReady()
    const user = this.auth.currentUser
    if(user) {
      return user as User
    }
    else {
      return undefined
    }
  }

  // Provide a way to check if a user is currently or not
  isLoggedIn() : Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if(user) {
          console.log(user)
          resolve(true)
        }
        else {
          console.warn("not logged in")
          this.router.navigate(['login'])
          resolve(false)
        }
      })
    });
  }
}

// Provide a way to prevent any anonymous user to access user-tied pages via the canActivate parameter in Routes
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn()
}
