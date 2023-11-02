import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

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

  title = 'To-do List';

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }
}
