import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { mockTasks } from './mocks/stepper.mock';
import { Task, TaskStatus } from './types';

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

  get currentStep(): Task {
    const currentStep = this._steps.find(
      (task) => task.status === TaskStatus.Active
    );
    return currentStep ? { ...currentStep } : null;
  }

  constructor() {
    this.initialize();
    this.steps = new BehaviorSubject(this._steps);
  }

  // TODO: Handle navigation or guard route when activated route isn't visible.
  handleCashDeal() {
    this._steps.forEach((step) => {
      if (!step.availableOnCashDeal) {
        step.status = TaskStatus.Hidden;
      }
    });
    this.steps.next(this.visibleSteps);
  }

  reset() {
    this.initialize();
    this.steps.next(this.visibleSteps);
  }

  private initialize() {
    this._steps = mockTasks.map((task) => {
      return { ...task };
    });
  }
}
