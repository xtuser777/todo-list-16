import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  @Input()
  public projectName!: string;
  @Output()
  public outputEvent = new EventEmitter<string>();
  public title = 'To-do List';
  public todoSignal!: WritableSignal<Array<Todo>>;
  public renderTestMessage = false;

  constructor(private todoSignalsService: TodoSignalsService) {}

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateTodo(todo: Todo): void {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }
}
