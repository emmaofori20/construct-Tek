import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot=false;
  errorMessage:string ="";
  constructor() { }

  ngOnInit(): void {
  }

}
