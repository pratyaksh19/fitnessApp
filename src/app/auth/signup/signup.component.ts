import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    birthdate: new FormControl(''),
    agree: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // we want minimum age should be 18
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  onSubmit(){ // we need to register user on sign up
    console.log(this.signupForm);
    this.authService.registerUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
    });
  }

}
