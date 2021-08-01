import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {

  constructor(private http:HttpClient) { }

  WorkwithusForm: FormGroup= new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    message: new FormControl(),
  })

  ngOnInit(): void {
    AOS.init({delay: 200, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, });
    // AOS.init()

  }

  onsubmit(){
    console.log(this.WorkwithusForm.value);
    const email = this.WorkwithusForm.value.email;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/mbjqzjvo',
      { name: this.WorkwithusForm.value.name, replyto: this.WorkwithusForm.value.email, message: this.WorkwithusForm.value.message },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
        }
      );

      this.WorkwithusForm.reset()
  }

  toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden");
    document.getElementById(collapseID).classList.toggle("block");
  }
}
