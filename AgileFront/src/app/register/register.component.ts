import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../services/register/register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //@ts-ignore
  signUpForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private reg : RegisterService,
  ){}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['',
    [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
    })
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

  submitForm(){
    this.reg.createUserWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password).then(r => console.log(r));
  }
}
