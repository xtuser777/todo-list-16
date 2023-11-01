import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todo-key-local-storage';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [NgFor,NgIf,NgTemplateOutlet,MatCardModule,MatButtonModule,MatIconModule,MatTabsModule],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {
  private todoSignalService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalService.todosState;
  public todos = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log(this.todosSignal());
    });
  }

  ngOnInit(): void {
    this.getTodosStorage();
  }

  private getTodosStorage(): void {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodos(): void {
    this.todoSignalService.saveTodos();
  }

  public handleDoneTodo(id: number): void {
    if (id) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((t) => t?.id == id) as Todo;
        todoSelected && (todoSelected.done = !todoSelected.done);
        this.saveTodos();
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todos().indexOf(todo);

      if (index != -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodos();
        })
      }
    }
  }
}
