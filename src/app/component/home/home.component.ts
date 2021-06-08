import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errMsg = '';
  todoTitle = '';
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToErrMsg();
  }

  subscribeToErrMsg(){
    this.todoService.errMsg$.subscribe(res => {
      this.errMsg = res;
    })
  }

  async saveToDoItem() {
    const item = {
      title: this.todoTitle,
      checked: false,
    }
    try{
      const res = await this.todoService.saveToDoItem(item);

      this.todoService.todoListUpdated$.next(true);
      this.todoTitle = '';
    } catch(error){
      if(error.status === 401) {
        this.router.navigate(['/login']);
      }
    }
    
  }
}
