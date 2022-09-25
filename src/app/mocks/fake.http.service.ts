import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task, Tasks } from '../types';
import { mockTasks } from './stepper.mock';

export interface FakeHttpService<T> {
  fetchMockData(): Observable<T>;
}

@Injectable({
  providedIn: 'root',
})
export class MockTasksHttpService implements FakeHttpService<Tasks> {
  fetchMockData(): Observable<Tasks> {
    return of(mockTasks).pipe(delay(2000));
  }
}
