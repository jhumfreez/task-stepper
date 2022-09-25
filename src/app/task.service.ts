import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { mockTasks } from './mocks/stepper.mock';
import { Task } from './types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // TODO: Move to state selector
  steps: Observable<Task[]> = of(mockTasks);
  constructor() {}
}
