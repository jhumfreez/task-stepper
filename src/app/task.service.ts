import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { INIT_TASKS } from './constants';
import { LastLockableTask, Task, Tasks, TaskStatus, TaskType } from './types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // TODO: Move to state selector
  private _steps: Tasks;

  private _step$: BehaviorSubject<Tasks>;

  private isVisible = (steps: Task) => steps.status !== TaskStatus.Hidden;

  get visibleSteps() {
    return this.getState()
      .filter(this.isVisible)
      .map<Task>((x) => structuredClone(x));
  }

  get steps() {
    // Not returning behavior subject to guard against updates from multiple sources
    return this._step$.asObservable();
  }

  get currentStep(): Task {
    const currentStep = this.getState().find(
      (task) => task.status === TaskStatus.Active
    );
    // Return copy to follow principle of immutability
    // Reference: https://indepth.dev/posts/1381/immutability-importance-in-angular-applications
    return currentStep ?? this.farthestVisited;
  }

  get farthestVisited(): Task {
    const visitedSteps = this.getState().filter(
      (x) => x.status === TaskStatus.Visited
    );
    return visitedSteps.slice(-1)[0] ?? null;
  }

  constructor() {
    this.initialize();
    this._step$ = new BehaviorSubject(this.visibleSteps);
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
        x.status = TaskStatus.Visited;
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
  handleAvailable() {
    const patch: Tasks = this.getState().map((step) => {
      if (!step.available) {
        step.status = TaskStatus.Hidden;
      }
      return step;
    });
    this.patchState(patch);
  }

  reset() {
    this.patchState(INIT_TASKS);
  }

  lockSteps(lastLockable: LastLockableTask) {
    const patch = this.getState().map((x) => {
      if (x.taskType <= lastLockable) {
        x.status = TaskStatus.Locked;
        return Object.freeze(x);
      }
      return x;
    });
    this.patchState(patch);
  }

  navigateSteps(prevTask: TaskType, nextTask: TaskType) {
    const patch = this.getState().map((x: Task) => {
      const inRange = this.taskInRange(x.taskType, prevTask, nextTask);
      if (x.taskType === prevTask) {
        x.status = null;
      } else if (x.taskType === nextTask) {
        x.status = TaskStatus.Active;
      }
      
      if (inRange && x.optional) {
        x.status = TaskStatus.Skipped;
      } else if (inRange) {
        x.status = TaskStatus.Visited;
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

  private getState(): Tasks {
    return structuredClone(this._steps);
  }

  private patchState(steps: Tasks) {
    this._steps = steps.map((v: Task, i: number) => ({
      ...this._steps[i],
      ...v,
    }));
    // dependencies don't need to know about steps that aren't available.
    this._step$.next(this.visibleSteps);
  }

  private initialize(tasks = INIT_TASKS) {
    this._steps = structuredClone(tasks);
    // NOTE: Alternative approach to cloning list below...
    // this._steps = INIT_TASKS.map((task) => {
    //   return { ...task };
    // });
  }
}
