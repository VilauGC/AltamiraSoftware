import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { LoginPayload } from "../login-payload";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  onSubmitUsers() {
    // @ts-ignore
    this.loginPayload.username = this.loginForm.get('username').value;
    // @ts-ignore
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => { //inside we handle the success response
      console.log('login succes');
      this.router.navigateByUrl('/Home');
    }, error => {
      console.log('login failed');

    });

  }

    onSubmitAdmin() {
      // @ts-ignore
      this.loginPayload.username = this.loginForm.get('username').value;
      // @ts-ignore
      this.loginPayload.password = this.loginForm.get('password').value;


      this.authService.loginAdmin(this.loginPayload).subscribe(data => { //inside we handle the success response
        console.log('login succes');
        this.router.navigateByUrl('/Home');
      }, error => {
        console.log('login failed');
      });
  }
  }
