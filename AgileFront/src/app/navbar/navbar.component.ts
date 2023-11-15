import { Component } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLogged = false;

  constructor(private auth : AuthService){
    this.auth.isLoggedIn().then((loggedIn) => {
      this.isLogged = loggedIn;
     }
    )
  }

}
