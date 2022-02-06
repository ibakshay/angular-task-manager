import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TaskService } from '../../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [TasksComponent],
      providers: [
        TaskService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.debugElement.componentInstance;
    taskService = fixture.debugElement.injector.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnit', () => {
    // @ts-ignore
    let spyGetTasks = spyOn(component, 'getTasks').and.returnValue([]);
    component.ngOnInit();
    expect(component.tasks).toEqual([]);
  });

  it('Should call getTasks and return an empty array', fakeAsync(() => {
    let spyGetTasks = spyOn(taskService, 'getTasks').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getTasks();
    tick(100);
    expect(component.tasks).toEqual([]);
  }));

  it('Should call getTasks and return an array with one elememt', fakeAsync(() => {
    let spyGetTasks = spyOn(taskService, 'getTasks').and.callFake(() => {
      return Rx.of([{
        id: 2,
        text: 'Meeting at College',
        day: 'May 6th at 2:30pm',
        reminder: true
      }]).pipe(delay(100));
    });
    component.getTasks();
    tick(100);
    expect(component.tasks).toEqual([{
      id: 2,
      text: 'Meeting at College',
      day: 'May 6th at 2:30pm',
      reminder: true
    }]);
  }));

  
});

