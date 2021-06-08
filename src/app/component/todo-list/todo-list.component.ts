import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Router } from '@angular/router';

interface ToDoItem {
  title: String,
  checked: boolean
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  toDoList: ToDoItem[] = [];
  constructor(private todoService: TodoService, 
    public changeDetector: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    // this.getAllToDos();
    this.subscribeTodoListUpdated();
    
  }

  subscribeTodoListUpdated() {
    this.todoService.todoListUpdated$.subscribe(res => {
      if(res){
        this.getAllToDos();
      }
    });
  }

  async getAllToDos(){
    try {
      let res: any = await this.todoService.getTodoList()
      
      this.toDoList = res;
      this.changeDetector.markForCheck();
    } catch(error){
      console.error(error);
      
      if(error.status === 401) {
        this.router.navigate(['/login']);
      }
    }
    
  }

}
