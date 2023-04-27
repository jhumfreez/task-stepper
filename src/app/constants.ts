import { Task, TaskConfig, TaskType } from './types';
import { extractConfig } from './utils';

export const INIT_TASKS: Task[] = [
  new Task('Config Selection', TaskType.TaskA, true, false),
  new Task('Contact Info', TaskType.TaskB, true, false),
  new Task('Thing 1', TaskType.TaskC, true, true),
  new Task('Thing 2', TaskType.TaskD, true, true),
  new Task('Thing 3', TaskType.TaskE, false, true),
  new Task('Locking Point', TaskType.TaskF, false, true),
  new Task('Thing 4', TaskType.TaskG, true, true),
  new Task('Finalize', TaskType.TaskH, true, false),
];

// Oof...
export const TASK_CONFIG = new Map<TaskType, TaskConfig>([
  [TaskType.TaskA, extractConfig(INIT_TASKS[TaskType.TaskA])],
  [TaskType.TaskB, extractConfig(INIT_TASKS[TaskType.TaskB])],
  [TaskType.TaskC, extractConfig(INIT_TASKS[TaskType.TaskC])],
  [TaskType.TaskD, extractConfig(INIT_TASKS[TaskType.TaskD])],
  [TaskType.TaskE, extractConfig(INIT_TASKS[TaskType.TaskE])],
  [TaskType.TaskF, extractConfig(INIT_TASKS[TaskType.TaskF])],
  [TaskType.TaskG, extractConfig(INIT_TASKS[TaskType.TaskG])],
  [TaskType.TaskH, extractConfig(INIT_TASKS[TaskType.TaskH])],
]);
