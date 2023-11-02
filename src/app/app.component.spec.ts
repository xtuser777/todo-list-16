import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'todo-list-16' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('todo-list-16');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('todo-list-16 app is running!');
  // });

  it('should set @Input() property corretly', () => {
    component.projectName = 'Todo list';

    fixture.detectChanges();

    expect(component.projectName).toEqual('Todo list');
  });

  it('should emit event with @Output() decorator correctly', () => {
    component.projectName = 'Todo list';

    component.outputEvent.pipe(first()).subscribe({
      next: (event) => {
        expect(event).toEqual('Todo list');
        component.handleEmitEvent();
      }
    })
  })
});
