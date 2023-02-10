import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from '../register-payload';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; //tranks the value and validate the formControl
  registerPayload: RegisterPayload;

  constructor(
    private formBuilder: FormBuilder, //initialize the form
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  ngOnInit(): void {}

  //to access the values we can use the formGroup to get the values based on the formControl name
  onSubmit() {
    //assign the form control values to the coresponding fields
    // @ts-ignore
    this.registerPayload.username = this.registerForm.get('username').value;
    // @ts-ignore
    this.registerPayload.email = this.registerForm.get('email').value;
    // @ts-ignore
    this.registerPayload.password = this.registerForm.get('password').value;
    // @ts-ignore
    this.registerPayload.confirmPassword =
      this.registerForm.get('confirmPassword')?.value;

    this.authService.register(this.registerPayload).subscribe(
      (data) => {
        //inside we handle the success response
        console.log('register succes');
        // this.router.navigateByUrl('/register-success');
        // Ciprian
        this.router.navigateByUrl('/Home');
      },
      (error) => {
        console.log('register failed');
      }
    );
  }
}
