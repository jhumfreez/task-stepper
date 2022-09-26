import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { Task, TaskStatus } from '../types';
import { SetTasks, UpdateTask } from './task.actions';
import { patch, updateItem } from '@ngxs/store/operators';

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
    tasks: [],
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

  @Action(SetTasks)
  setTasks(ctx: StateContext<TaskStateModel>, action: SetTasks) {
    ctx.setState(patch<TaskStateModel>({ tasks: action.tasks }));
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
  @Action(UpdateTask)
  updateTaskAlt(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    ctx.setState(
      patch<TaskStateModel>({
        tasks: updateItem<Task>(
          (stateTask: Task) => stateTask.taskType === action.task.taskType,
          action.task
        ),
      })
    );
  }
}
