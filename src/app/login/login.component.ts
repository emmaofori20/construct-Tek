import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private auth: AuthService, private router: Router, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });
  }

  async onSubmit(){
    this.loaderService.setHttpProgressStatus(true);

  await this.auth.SignIn(this.LogInForm.value.email, this.LogInForm.value.password).then(res=>{
    console.log("sucessful loglin", res);
    this.loaderService.setHttpProgressStatus(false);
    this.router.navigate(['home-page']);


  }).catch(err=>{
    console.log("error", err)
    this.loaderService.setHttpProgressStatus(false);
    this.errorMessage = true;
    this.isValid = true;
  })

  }
  onToggle(){
    this.forgot = !this.forgot;
  }
  onModalResult (result: boolean){
    console.log(result);
    this.forgot= result;
  }
}
