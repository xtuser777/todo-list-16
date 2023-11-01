import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './todo-form.component.html',
  styleUrls: []
})
export class TodoFormComponent {
  private todoSignalsService = inject(TodoSignalsService);
  private dialogServiceRef = inject(MatDialogRef<HeaderComponent>);
  public todos = this.todoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  public handleCreateTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const id = this.todos.length > 0 ? this.todos.length + 1 : 1;
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const done = false;

      this.todoSignalsService.updateTodos({ id, title, description, done });
      this.dialogServiceRef.close();
    }
  }

  public handleCloseModal(): void {
    this.dialogServiceRef.close();
  }
}
