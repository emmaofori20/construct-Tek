import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  //for the login
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot = false;
  errorMessage = false;
  LogInForm: FormGroup;
  _errormessage = '';

  //signup form
  signupForm: FormGroup = new FormGroup({
    Surname: new FormControl(null),
    Othername: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null),
    Confirmpassword: new FormControl(null),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private dataservice: DataService,
    private userservice: UserServiceService,

  ) { }

  ngOnInit(): void {

    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });

    //signup form
  }


  //for log in
  async onSubmitLogin() {
    this.loaderService.setHttpProgressStatus(true);
    //user is authenticated
    await this.auth
      .SignIn(this.LogInForm.value.email, this.LogInForm.value.password)
      .then(async (res) => {
        //successful login user is routed to the homepage
        console.log('sucessful loglin', res);
        //setting a user after login
        await this.dataservice._setActiveUser(res);
        this.router.navigate(['home-page']);
        this.loaderService.setHttpProgressStatus(false);
      })
      .catch((err) => {
        console.log('error', err);
        this.loaderService.setHttpProgressStatus(false);
        this._errormessage = err.message;
        this.errorMessage = true;
        this.isValid = true;
      });
  }

  //opens the forget modal password
  onToggle() {
    console.log('clcied')
    this.forgot = !this.forgot;
  }
  onModalResult(result: boolean) {
    console.log(result);
    this.forgot = result;
  }

  //signup toggleer
  signup(){
    document.getElementById('container').classList.add("right-panel-active");
    document.getElementById('').style.backgroundColor='#2c2c3fcc'
  }

  signin(){
    document.getElementById('container').classList.remove("right-panel-active");
  }

  /////////SIGN UP/////

  onSubnmit() {
    this.loaderService.setHttpProgressStatus(true);
    this.userservice.newUSer(
      this.signupForm.value.Othername,
      this.signupForm.value.Surname,
      this.signupForm.value.email,
      false,
      "null",
      this.signupForm.value.Confirmpassword,

    )
}

}
