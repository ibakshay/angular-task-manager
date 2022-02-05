import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interface';

describe('TaskServiceService', () => {
  let taskService: TaskService;

  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    taskService = TestBed.inject(TaskService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Task service got created', () => {
    expect(taskService).toBeDefined();
  });
  it('Should get all the tasks', () => {
    const mockResponse = [{
      id: 1,
      text: 'Meeting at College',
      day: 'May 6th at 2:30pm',
      reminder: true
    }, {
      id: 2,
      text: 'Meeting at Lignite City Club',
      day: 'May 6th at 2:30pm',
      reminder: false
    }, {
      id: 3,
      text: 'Meeting at Tennis',
      day: 'May 6th at 2:30pm',
      reminder: false
    }];

    /*
    CCC
    1. Call the actual service method
    2. check the URL
    3. Check the HTTP verb
     */

    // call the actual service method
    taskService.getTasks().subscribe(responseData => expect(responseData).toEqual(mockResponse));

    // check the URL
    const req = httpController.expectOne('http://localhost:3000/tasks');
    // check the HTTP verb
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should delete the task', () => {
    const task: Task = {
      id: 1,
      text: 'Meeting at College',
      day: 'May 6th at 2:30pm',
      reminder: true
    };
    /// CCC
    // Call the actual method
    taskService.deleteTask(task).subscribe((responsedata) => {
      expect(responsedata).toEqual(task);
    });

    // check the URL
    const req = httpController.expectOne(`http://localhost:3000/tasks/${task.id}`);

    // check the HTTP verb
    expect(req.request.method).toEqual('DELETE');
    req.flush(task);
  });

  it('should update the task', () => {
    const task: Task = {
      id: 1,
      text: 'Meeting at College',
      day: 'May 6th at 2:30pm',
      reminder: true
    };

    // CCC

    // Call the actual method
    taskService.updateTaskReminder(task).subscribe(responseData => expect(responseData).toEqual(task));

    // check the URL
    const req = httpController.expectOne(`http://localhost:3000/tasks/${task.id}`);
    // check the HTTP Verb
    expect(req.request.method).toEqual('PUT');
    req.flush(task);
  });

  it('should add the task', () => {

    const task: Task = {
      id: 1,
      text: 'Meeting at College',
      day: 'May 6th at 2:30pm',
      reminder: true
    };

    // CCC
    // Call the actual method
    taskService.addTask(task).subscribe(responseData => expect(responseData).toEqual(task));

    // check the URL
    const req = httpController.expectOne(`http://localhost:3000/tasks`);

    // check the HTTP verb
    expect(req.request.method).toEqual('POST');
    req.flush(task);

  });
});
