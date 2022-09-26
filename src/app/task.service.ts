import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { mockTasks } from './mocks/stepper.mock';
import { Task, TaskStatus, isFinanceTask } from './types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // TODO: Move to state selector
  private _steps: Task[];

  readonly steps: BehaviorSubject<Task[]>;

  get visibleSteps() {
    return this._steps.filter((steps) => steps.status !== TaskStatus.Hidden);
  }

  getSteps() {
    // Not returning behavior subject to guard against updates from multiple sources
    return this.steps.asObservable();
  }

  constructor() {
    this._steps = mockTasks.map((task) => {
      return { ...task };
    });
    this.steps = new BehaviorSubject(this._steps);
  }

  handleCashDeal() {
    this._steps.forEach((step) => {
      if (isFinanceTask(step.taskType)) {
        step.status = TaskStatus.Hidden;
      }
    });
    this.steps.next(this.visibleSteps);
  }
}
