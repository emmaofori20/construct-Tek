import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/interceptors/loader.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  errormessage:string;

  constructor(private auth : AuthService, private loaderService: LoaderService,
    ) { }


  ngOnInit(): void {
    this.forgotPassword=new FormGroup({
      forgotPassword: new FormControl(null, Validators.required)
    })
  }

onSubmit(){
  console.log(this.forgotPassword.value.forgotPassword);
  try {
    this.loaderService.setHttpProgressStatus(true);
    this.auth.ResetPassword(this.forgotPassword.value.forgotPassword).then(result=>{
      console.log("user exist", result);
      this.loaderService.setHttpProgressStatus(false);
    }).catch(error=>{
      console.log("User does not exist", error.message);
      this.errormessage=error.message;
      this.loaderService.setHttpProgressStatus(false);
    });
  } catch (error) {
    console.log(error);

  }

}

onBack(value:boolean){
this.onResult.emit(value);
console.log('onBack',value);
}

}
