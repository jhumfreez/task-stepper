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
    return this._steps
      .filter((steps) => steps.status !== TaskStatus.Hidden)
      .map((x) => {
        return { ...x };
      });
  }

  private get steps() {
    return this._steps.map((x) => {
      return { ...x };
    });
  }

  getSteps() {
    // Not returning behavior subject to guard against updates from multiple sources
    return this.step$.asObservable();
  }

  get currentStep(): Task {
    const currentStep = this._steps.find(
      (task) => task.status === TaskStatus.Active
    );
    return currentStep ? { ...currentStep } : null;
  }

  constructor() {
    this.initialize();
    this.step$ = new BehaviorSubject(this._steps);
  }

  getTaskByType(taskType: TaskType): Task {
    const task = this._steps.find((x) => x.taskType === taskType);
    return task ? { ...task } : null;
  }

  // TODO: Handle navigation or guard route when activated route isn't visible.
  handleCashDeal() {
    this._steps.forEach((step) => {
      if (!step.availableOnCashDeal) {
        step.status = TaskStatus.Hidden;
      }
    });
    this.step$.next(this.visibleSteps);
  }

  reset() {
    this.initialize();
    this.step$.next(this.visibleSteps);
  }

  lockSteps(lastLockable: TaskType){
    this.step$.next( this.steps.map(x=>{
      if(x.taskType <= lastLockable){
        x.status = TaskStatus.Locked;
      }
      return x;
    }));
  }

  navigateSteps(prevTask: TaskType, nextTask: TaskType) {
    const steps = this.processTasks(prevTask, nextTask);
    this.step$.next(steps);
  }

  private processTasks(prevTask: TaskType, nextTask: TaskType) {
    return this._steps.map((x) => {
      const inRange =
        (prevTask < nextTask &&
          x.taskType >= prevTask &&
          x.taskType < nextTask) ||
        (prevTask > nextTask &&
          x.taskType >= nextTask &&
          x.taskType < prevTask);
      if (inRange) {
        const skippable = x.optional;
        // const isVisible = this.visibleSteps.some(x=>x.taskType === x.taskType);
        const taskCompleted = x.status === TaskStatus.Complete;
        if (skippable && !taskCompleted) {
          x.status = TaskStatus.Skipped;
        }
      }
      if (x.taskType === nextTask) {
        x.status = TaskStatus.Active;
      }
      return x;
    });
  }

  private initialize() {
    this._steps = mockTasks.map((task) => {
      return { ...task };
    });
  }
}
