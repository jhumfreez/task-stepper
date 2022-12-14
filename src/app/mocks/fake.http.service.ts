import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { INIT_TASKS } from '../constants';
import { Task } from '../types';

export interface FakeHttpService<T> {
  fetchMockData(expectedResult?: T): Observable<T>;
}

// TODO: Use this instead of the other implementations below, more re-usable.
@Injectable({
  providedIn: 'root',
})
export class MockHttpService implements FakeHttpService<unknown> {
  fetchMockData(
    expectedResult: unknown = structuredClone([1, 2, 3, 4, 5, 6])
  ): Observable<unknown> {
    return of(expectedResult).pipe(delay(2000));
  }
}

// Tasks aren't remote but depend on remote calls, need to work out a simulation; for now, this is a placeholder
@Injectable({
  providedIn: 'root',
})
export class MockTasksHttpService implements FakeHttpService<Task[]> {
  fetchMockData(
    expectedResult: Task[] = structuredClone(INIT_TASKS)
  ): Observable<Task[]> {
    return of(expectedResult).pipe(delay(2000));
  }
}

// Abstracts evaluation of when to hide tasks based on http response by returning given result after time
@Injectable({
  providedIn: 'root',
})
export class SimpleDealHttpService implements FakeHttpService<boolean> {
  fetchMockData(expectedResult = true): Observable<boolean> {
    return of(expectedResult).pipe(delay(2000));
  }
}
