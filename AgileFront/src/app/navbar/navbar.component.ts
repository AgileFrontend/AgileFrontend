import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.checkLogState();
  }

  checkLogState() {
    this.auth.isLoggedIn().then((logState) => {
      this.isLoggedIn = logState;
    });
    return this.isLoggedIn;
  }
}
