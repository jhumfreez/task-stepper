import { Task } from '../types';

export class SetTasks {
  static readonly type = '[Task] Overwrite Task List';
  constructor(public tasks: Task[]) {}
}

export class UpdateTask {
  static readonly type = '[Task] Overwrite Task List';
  constructor(public task: Task) {}
}
