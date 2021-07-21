import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './services/auth.service';

@Pipe({
  name: 'isLoggedIn'
})
export class IsLoggedInPipe implements PipeTransform {

  constructor(private authservice:AuthService){}
  transform(value: unknown, ...args: unknown[]): unknown {
    let isLoggedIn =  this.authservice.isLoggedIn();
    console.info("isLoggedIn",isLoggedIn);
    return isLoggedIn;

  }

}
