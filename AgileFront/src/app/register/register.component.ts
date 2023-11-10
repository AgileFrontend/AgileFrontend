import { Component } from '@angular/core';
import { RegisterService } from '../services/register/register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    Validators.minLength(8),
    Validators.maxLength(100),
  ]);
  registerForm = new FormGroup([this.email, this.password]);
  hide = true;

  constructor(private reg: RegisterService) {}

  onSubmitForm() {
    if (this.email.value != null && this.password.value != null) {
      this.reg
        .createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then((user) => console.log(user))
        .catch((err) => console.warn(err));
    }
  }
}
