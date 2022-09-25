import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { Task, TaskStatus } from '../types';
import { SetTasks, UpdateTask } from './task.actions';

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
  setTasks({ patchState }: StateContext<TaskStateModel>, action: SetTasks) {
    patchState({ tasks: action.tasks });
  }

  @Action(UpdateTask)
  updateTasks(
    { patchState, getState }: StateContext<TaskStateModel>,
    action: UpdateTask
  ) {
    const taskList = getState().tasks.map((x) => {
      if (x.taskType === action.task.taskType) {
        x = { ...action.task };
      }
    });
    patchState({ tasks: taskList });
  }
}
