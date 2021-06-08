import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'steve';
  password = 'wonder321';

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const res: any = await this.todoService.login(this.username, this.password);

    if(res.accessToken) {
      localStorage.setItem("TodoToken", res.accessToken);
      this.router.navigate(['/']);
    }
  }

}
