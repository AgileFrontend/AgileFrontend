import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
/**
 * @classdesc Component for the login page
 * This page handles the login of the user with the firebase authentication service
 * It redirects the user to the homepage if the login is successful
 * @authors samaritan-mt & pacmaybz
 */
export class LoginComponent implements OnInit {
  @Input() email = ''; // email of the user
  @Input() password = ''; // password of the user
  hide = true;

  /**
   * Constructor of the login component
   * It takes the router and the auth service as injected parameters
   * @see https://angular.io/guide/dependency-injection for more information about dependency injection
   * @param router : router of the application
   * @param auth : authentication service of firebase
   */
  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

  /**
   * Method called when the component is initialized
   * It sets the hide variable to true which is used to hide/show the password of the user
   */
  ngOnInit(): void {
    this.hide = true;
  }

  /**
   * Method called when the user clicks on the login button
   * It checks if the email and the password are not empty then proceeds to sanitize them to avoid XSS attacks
   * If they are not empty, it calls the firebase authentication service to sign in the user
   * If the login is successful, it redirects the user to the homepage
   * If the login is not successful, it displays an alert with the error code and the error message
   */
  signIn() {
    if (this.email && this.password) {
      this.email = sanitize(this.email);
      this.password = sanitize(this.password);
      signInWithEmailAndPassword(this.auth, this.email, this.password) // firebase authentication service call
        .then((usercredential) => {
          const user = usercredential.user; // on success, we get the user
          this.router.navigate(['homepage'], {
            queryParams: { sessionToken: user.getIdToken() },
          }); //we redirect the user to the homepage with the session token as a query parameter
        })
        .catch((error) => {
          // Error handling alert
          const errorcode = error.code;
          const errormessage = error.message;
          alert('Error while login : ' + errorcode + '\n' + errormessage);
        });
    }
  }
  /**
   * Method called when the user clicks on the sign up button
   * It redirects the user to the registration page
   */
  signUp() {
    this.router.navigate(['registration']);
  }
}

/**
 * Method used to sanitize a string to avoid XSS attacks
 * @param string : string to sanitize
 * @returns string with the escaped special characters replaced by their html code
 */
function sanitize(string: string): string {
  const map = new Map<string, string>();
  map.set('&', '&amp;');
  map.set('<', '&lt;');
  map.set('>', '&gt;');
  map.set('"', '&quot;');
  map.set("'", '&#x27;');
  map.set('/', '&#x2F;');

  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map.get(match) || '');
}
