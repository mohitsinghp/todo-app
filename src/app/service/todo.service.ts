import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface NewToDoItem {
  title: string,
  checked: boolean
}

interface ToDoItem {
  _id: string,
  title: string,
  checked: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoListUpdated$ = new BehaviorSubject<boolean>(true);
  errMsg$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getTodoList(){
    return this.http.get('http://localhost:3001').toPromise();
  }

  saveToDoItem(item: NewToDoItem){
    return this.http.post('http://localhost:3001', item).toPromise();
  }

  deleteTodoItem(id: string) {
    return this.http.delete('http://localhost:3001/' + id).toPromise();
  }

  updateTodoItem(id: string, checked: boolean){
    const body = {
      checked: checked
    }
    return this.http.put('http://localhost:3001/' + id, body).toPromise();
  }

  login(username: string, password: string) {
    const body = {
      "username": username,
      "password": password
    }
    return this.http.post('http://localhost:3001/login', body).toPromise();
  }
}
