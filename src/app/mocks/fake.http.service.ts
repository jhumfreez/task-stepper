import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../types';
import { mockTasks } from './stepper.mock';

export interface FakeHttpService<T> {
  fetchMockData(): Observable<T>;
}

// Tasks aren't remote but depend on remote calls, need to work out a simulation; for now, this is a placeholder
@Injectable({
  providedIn: 'root',
})
export class MockTasksHttpService implements FakeHttpService<Task[]> {
  fetchMockData(): Observable<Task[]> {
    return of(mockTasks).pipe(delay(2000));
  }
}
