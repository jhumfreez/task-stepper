import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { Task, TaskStatus, TaskType } from '../types';
import { CompleteTask, LockTasks, ProcessTasks, SetTasks, UpdateTask } from './task.actions';
import { patch, updateItem } from '@ngxs/store/operators';
import { mockTasks } from '../mocks/stepper.mock';
import { X } from '@angular/cdk/keycodes';

/**
 * Benefits:
 * 1. Can retain state on refresh -- no need to rebuild stepper state
 * 2. Does essentially the same thing without managing observables
 */

export interface TaskStateModel {
  tasks: Task[];
}

const TASK_STATE_TOKEN = new StateToken<TaskStateModel>('tasks');

@State<TaskStateModel>({
  name: TASK_STATE_TOKEN,
  defaults: {
    tasks: mockTasks,
  },
})
// https://angular.io/api/core/Injectable
@Injectable()
export class TaskState {
  @Select()
  static getTasks(ctx: StateContext<TaskStateModel>): Task[] {
    return ctx.getState().tasks;
  }

  @Select()
  static getActiveTask(ctx: StateContext<TaskStateModel>): Task {
    return ctx
      .getState()
      .tasks.find((tasks) => tasks.status === TaskStatus.Active);
  }

  // TODO: Get current task

  @Action(SetTasks)
  setTasks(ctx: StateContext<TaskStateModel>, action: SetTasks) {
    ctx.setState(patch<TaskStateModel>({ tasks: action.tasks }));
  }

  @Action(LockTasks)
  lockTasks(ctx: StateContext<TaskStateModel>, action: LockTasks) {
    const finalLockableStep = TaskType.CreditApp;
    const patch = ctx.getState().tasks.map((x) => {
      if (x.taskType <= finalLockableStep) {
        x.status = TaskStatus.Locked;
      }
      return x;
    });
    ctx.setState({ ...ctx.getState(), tasks: patch });
  }

  @Action(ProcessTasks)
  processTasks(ctx: StateContext<TaskStateModel>, action: ProcessTasks) {
    const patch = ctx.getState().tasks.map((x) => {
      const inRange = this.taskInRange(
        x.taskType,
        action.prevTask,
        action.nextTask
      );
      if (inRange && x.optional) {
        x.status = TaskStatus.Skipped;
      } else if (inRange) {
        x.status = TaskStatus.Visited;
      }
      if (x.taskType === action.nextTask) {
        x.status = TaskStatus.Active;
      }
      return x;
    });
    ctx.setState({ ...ctx.getState(), tasks: patch });
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    const taskList = ctx.getState().tasks.map((x: Task) => {
      if (x.taskType === action.task.taskType) {
        return { ...action.task };
      }
      return x;
    });
    // ctx.setState(patch<TaskStateModel>({ tasks: taskList }));
    ctx.setState({ ...ctx.getState(), tasks: taskList });
  }

  // Alternative to above, for funsies or something
  // @Action(UpdateTask)
  // updateTaskAlt(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
  //   ctx.setState(
  //     patch<TaskStateModel>({
  //       tasks: updateItem<Task>(
  //         (stateTask: Task) => stateTask.taskType === action.task.taskType,
  //         action.task
  //       ),
  //     })
  //   );
  // }

  @Action(CompleteTask)
  completeTask(ctx: StateContext<TaskStateModel>, action: CompleteTask) {
    const taskList = ctx.getState().tasks.map((x: Task) => {
      if (x.taskType === action.currentTask) {
        x.status = TaskStatus.Visited;
      }
      return x;
    });
    ctx.setState(patch<TaskStateModel>({ tasks: taskList }));
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
}
