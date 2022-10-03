import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockTasks } from './mocks/stepper.mock';
import { Task, TaskStatus, TaskType } from './types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // TODO: Move to state selector
  private _steps: Task[];

  readonly step$: BehaviorSubject<Task[]>;

  get visibleSteps() {
    return this.getState()
      .filter((steps) => steps.status !== TaskStatus.Hidden)
      .map((x) => {
        return { ...x };
      });
  }

  get steps() {
    // Not returning behavior subject to guard against updates from multiple sources
    return this.step$.asObservable();
  }

  get currentStep(): Task {
    const currentStep = this.getState().find(
      (task) => task.status === TaskStatus.Active
    );
    return currentStep ? { ...currentStep } : null;
  }

  constructor() {
    this.initialize();
    this.step$ = new BehaviorSubject(this._steps);
  }

  activateTask(taskType: TaskType) {
    const patch = this.getState().map((x) => {
      if (x.taskType === taskType) {
        x.status = TaskStatus.Active;
      }
      return x;
    });
    this.patchState(patch);
  }

  completeTask(taskType: TaskType) {
    const patch = this.getState().map((x) => {
      if (x.taskType === taskType) {
        x.status = TaskStatus.Complete;
      }
      return x;
    });
    this.patchState(patch);
  }

  getTaskByType(taskType: TaskType): Task {
    const task = this.getState().find((x) => x.taskType === taskType);
    return task ? { ...task } : null;
  }

  // TODO: Handle navigation or guard route when activated route isn't visible.
  handleCashDeal() {
    const patch = this.getState().map((step) => {
      if (!step.availableOnCashDeal) {
        step.status = TaskStatus.Hidden;
      }
      return step;
    });
    this.patchState(patch);
  }

  reset() {
    this.initialize();
    this.step$.next(this.visibleSteps);
  }

  lockSteps(lastLockable: TaskType) {
    const patch = this.getState().map((x) => {
      if (x.taskType <= lastLockable) {
        x.status = TaskStatus.Locked;
      }
      return x;
    });
    this.patchState(patch);
  }

  navigateSteps(prevTask: TaskType, nextTask: TaskType) {
    const patch = this.getState().map((x) => {
      const inRange = this.taskInRange(x.taskType, prevTask, nextTask);
      if (inRange && x.optional) {
        x.status = TaskStatus.Skipped;
      } else if (inRange) {
        // Infer completion
        // TODO: figure this out when implementing route guard
        x.status = TaskStatus.Complete;
      }
      if (x.taskType === nextTask) {
        x.status = TaskStatus.Active;
      }
      return x;
    });
    this.patchState(patch);
  }

  private taskInRange(
    currentTask: TaskType,
    prevTask: TaskType,
    nextTask: TaskType
  ) {
    return prevTask < nextTask
      ? currentTask >= prevTask && currentTask < nextTask
      : currentTask <= prevTask && currentTask > nextTask;
  }

  private getState(): Task[] {
    return this._steps.map((x) => {
      return { ...x };
    });
  }

  private patchState(steps: Task[]) {
    this._steps = steps;
    // dependencies don't need to know about steps that aren't available.
    this.step$.next(this.visibleSteps);
  }

  private initialize() {
    this._steps = mockTasks.map((task) => {
      return { ...task };
    });
  }
}
