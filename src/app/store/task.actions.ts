import { TaskType, Task } from '../types';

export class SetTasks {
  static readonly type = '[Task] Overwrite Task List';
  constructor(public tasks: Task[]) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task List';
  constructor(public task: Task) {}
}

export class LockTasks {
  static readonly type = '[Task] Lock Tasks';
  constructor() {}
}

export class ProcessTasks {
  static readonly type = '[Task] Process Task List';
  constructor(public prevTask: TaskType, public nextTask: TaskType) {}
}

export class CompleteTask {
  static readonly type = '[Task] Complete Task';
  constructor(public currentTask: TaskType) {}
}
