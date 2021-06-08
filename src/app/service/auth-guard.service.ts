import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate() {
    try {
      const res: any = await this.auth.isValidToken();
      if(res.message !== 'Valid Token') {
        return false;
      }
      return true;
    }catch(error) {
      console.error('Valid Token API : ' + error);
      this.router.navigate(['/login']);
    }

    return false;
  }
}
