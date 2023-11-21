import { Component, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(
    private afAuth: Auth,
    private zone: NgZone,
    private auth: AuthService,
    private router : Router
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


  onTabChanged(event : MatTabChangeEvent) {
    switch(event.index) {
      case 0 : 
        this.router.navigate(['homepage']);
        break;
      case 1 : 
        break;
      case 2 :
        this.router.navigate(['my-project-page']);
        break;
      case 3 : 
        this.router.navigate(['profile/me/']);
        break;
      case 4 : 
        this.logOut();
        break;
    }
  }
}
