import { Component, NgZone, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('tabs', { static: false }) tabGroup!: MatTabGroup;
  isLoggedIn = false;
  constructor(
    private afAuth: Auth,
    private zone: NgZone,
    private auth: AuthService,
    private router: Router,
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

  /**
   * This function handles the possible routing scenarios in case the user changes tabs on the navbar
   * @param event : MatTabChangeEvent captures in an object the changes of tabs in the navbar
   */
  onTabChanged(event: MatTabChangeEvent) {
    if (!this.isLoggedIn) {
      switch (event.index) {
        case 0:
          this.router.navigate(['login']);
          break;
        case 1:
          this.router.navigate(['login']);
          break;
      }
    } else {
      switch (event.index) {
        case 0:
          this.router.navigate(['homepage']);
          break;
        case 1:
          this.router.navigate(['homepage']);
          event.index = 0;
          this.tabGroup.selectedIndex = 0;
          break;
        case 2:
          this.router.navigate(['my-project-page']);
          break;
        case 3:
          this.router.navigate(['profile/me/']);
          break;
        case 4:
          this.logOut();
          break;
      }
    }
  }
}
