import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { mockTasks } from './mocks/stepper.mock';
import { Task, TaskStatus, isFinanceTask } from './types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // TODO: Move to state selector
  _steps: Task[] = mockTasks.map((task) => {
    return { ...task };
  });

  steps: BehaviorSubject<Task[]> = new BehaviorSubject(this._steps);

  get visibleSteps() {
    return this._steps.filter((steps) => steps.status !== TaskStatus.Hidden);
  }

  getSteps() {
    return this.steps.asObservable();
  }

  constructor() {}

  handleCashDeal() {
    this._steps.forEach((step) => {
      if (isFinanceTask(step.taskType)) {
        step.status = TaskStatus.Hidden;
      }
    });
    this.steps.next(this._steps);
  }
}
