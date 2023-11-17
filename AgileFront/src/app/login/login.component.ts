import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';

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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);
  hide = true;
  loginForm = new FormGroup([this.email, this.password]);

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
    private toast: ToastrService,
    private authGuard: AuthService,
  ) {}

  /**
   * Method called when the component is initialized
   * It sets the hide variable to true which is used to hide/show the password of the user
   */
  ngOnInit(): void {
    this.hide = true;
    // Fetching the authguard to check if the user is loggedin to avoid him accessing login page via URL
    this.authGuard.isLoggedIn().then((logged) => {
      if (logged) {
        this.toast.info(
          'You are already logged in, redirecting you to homepage',
        );
        this.router.navigate(['homepage']);
        return;
      } else {
        return;
      }
    });
  }

  /**
   * Method called when the user clicks on the login button
   * It checks if the email and the password are not empty then proceeds to sanitize them to avoid XSS attacks
   * If they are not empty, it calls the firebase authentication service to sign in the user
   * If the login is successful, it redirects the user to the homepage
   * If the login is not successful, it displays an alert with the error code and the error message
   */
  signIn() {
    if (this.loginForm.valid && this.email.value && this.password.value) {
      const credemail = this.email.value;
      const credpass = this.password.value;
      signInWithEmailAndPassword(this.auth, credemail, credpass) // firebase authentication service call
        .then(() => {
          this.router.navigate(['homepage']); //we redirect the user to the homepage with the session token as a query parameter
        })
        .catch((error) => {
          // Error handling alert
          const errormessage = error.message;
          this.toast.error(
            'Error while login : ' + '\n' + errormessage,
            'Login Error',
          );
        });
    }
  }
  /**
   * Method called when the user clicks on the sign up button
   * It redirects the user to the registration page
   */
  signUp() {
    this.router.navigate(['register']);
  }
}
