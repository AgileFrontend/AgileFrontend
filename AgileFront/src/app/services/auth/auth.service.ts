import { Injectable, inject } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  // Returns a user if logged in, else return undefined
  async getCurrentUser(): Promise<User | null> {
    await this.auth.authStateReady();
    const user = this.auth.currentUser;
    return user;
  }

  // Provide a way to check if a user is currently or not
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  authGuardFn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }

  //Provide a way to log out the currently logged in user
  logOut() {
    this.auth.signOut();
  }
}

// Provide a way to prevent any anonymous user to access user-tied pages via the canActivate parameter in Routes
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).authGuardFn();
};
