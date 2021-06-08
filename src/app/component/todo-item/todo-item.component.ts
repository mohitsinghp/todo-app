import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: any;
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  async deleteTodo() {
    try{
      const res: any = await this.todoService.deleteTodoItem(this.todo._id);

    if (res.message === 'Todo Removed.') {
      this.todoService.todoListUpdated$.next(true);
    }
  } catch(error){
    console.log(error)
    if(error.status === 401) {
      this.router.navigate(['/login']);
    } else if(error.status === 403) {
      this.todoService.errMsg$.next("Not sufficient privileges");
    }
  }
}

  async strikeTodo(event: any) {
    this.todoService.errMsg$.next('');
    const checked = event.target.checked;
    try {
      const res: any = await this.todoService.updateTodoItem(this.todo._id, checked);

      if (res.message === 'Todo Updated.') {
        this.todoService.todoListUpdated$.next(true);
      }
    } catch (error) {
      console.error(error);

      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  }
}
