import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    Surname: new FormControl(null),
    Othername: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null),
    Confirmpassword: new FormControl(null),
  });


  constructor(
    private router: Router,
    private userservice: UserServiceService,
    private loaderService:LoaderService,
  ) {}

  ngOnInit(): void {}

  onSubnmit() {
    this.loaderService.setHttpProgressStatus(true);
    this.userservice.newUSer(
      this.signupForm.value.Othername,
      this.signupForm.value.Surname,
      this.signupForm.value.email,
      false,
      " ",
      this.signupForm.value.Confirmpassword,

    );
    //routes you to the login page after a successful sign up
    // this.router.navigate(['login']);
    // this.loaderService.setHttpProgressStatus(false);

  }
}
