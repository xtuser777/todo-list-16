import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todo-key-local-storage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  public todosState = signal<Array<Todo>>([]);

  public updateTodos({id, title, description, done}: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todosState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });
      this.saveTodos();
    }
  }

  public saveTodos(): void {
    const todos = JSON.stringify(this.todosState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
