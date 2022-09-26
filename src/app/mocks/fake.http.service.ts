import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../types';
import { mockTasks } from './stepper.mock';

export interface FakeHttpService<T> {
  fetchMockData(expectedResult?: T): Observable<T>;
}

// Tasks aren't remote but depend on remote calls, need to work out a simulation; for now, this is a placeholder
@Injectable({
  providedIn: 'root',
})
export class MockTasksHttpService implements FakeHttpService<Task[]> {
  fetchMockData(expectedResult = mockTasks): Observable<Task[]> {
    return of(expectedResult).pipe(delay(2000));
  }
}

// Abstracts evaluation of when to hide tasks based on http response by returning given result after time
@Injectable({
  providedIn: 'root',
})
export class SimpleDealHttpService implements FakeHttpService<boolean> {
  fetchMockData(expectedResult = true): Observable<boolean> {
    return of(expectedResult).pipe(delay(5000));
  }
}
