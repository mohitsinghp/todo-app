import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'steve';
  password = 'wonder321';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const res: any = await this.authService.login(this.username, this.password);

    if(res.accessToken) {
      localStorage.setItem("TodoToken", res.accessToken);
      this.router.navigate(['/']);
    }
  }

}
