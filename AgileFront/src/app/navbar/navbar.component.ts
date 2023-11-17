import { Component, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(
    private afAuth: Auth,
    private zone: NgZone,
    private auth: AuthService,
  ) {
    this.checkUserStatus();
  }

  checkUserStatus() {
    this.zone.run(() => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    });
  }
  logOut() {
    this.auth.logOut();
    this.isLoggedIn = false;
  }
}
