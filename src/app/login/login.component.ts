import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot=false;
  errorMessage=false;
  LogInForm: FormGroup;
  _errormessage='';
  constructor(private auth: AuthService, private router: Router, private loaderService: LoaderService, private dataservice:DataService) {
    if(auth.isLoggedIn()){
      router.navigate(["home-page"]);
    }
  }

  ngOnInit(): void {
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });
  }

  async onSubmit(){
    this.loaderService.setHttpProgressStatus(true);
    //user is authenticated
    await this.auth.SignIn(this.LogInForm.value.email, this.LogInForm.value.password).then( async res=>{
    //successful login user is routed to the homepage
    console.log("sucessful loglin", res);
    //setting a user after login
    await this.dataservice._setActiveUser(res);
    this.router.navigate(['home-page']);
    this.loaderService.setHttpProgressStatus(false);

  }).catch(err=>{
    console.log("error", err)
    this.loaderService.setHttpProgressStatus(false);
    this._errormessage=err.message;
    this.errorMessage = true;
    this.isValid = true;
  })

  }

  //opens the forget modal password
  onToggle(){
    this.forgot = !this.forgot;
  }
  onModalResult (result: boolean){
    console.log(result);
    this.forgot= result;
  }
}
