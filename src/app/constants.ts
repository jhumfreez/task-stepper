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
  [TaskType.TaskA, extractConfig(INIT_TASKS[0])],
  [TaskType.TaskB, extractConfig(INIT_TASKS[1])],
  [TaskType.TaskC, extractConfig(INIT_TASKS[2])],
  [TaskType.TaskD, extractConfig(INIT_TASKS[3])],
  [TaskType.TaskE, extractConfig(INIT_TASKS[4])],
  [TaskType.TaskF, extractConfig(INIT_TASKS[5])],
  [TaskType.TaskG, extractConfig(INIT_TASKS[6])],
  [TaskType.TaskH, extractConfig(INIT_TASKS[7])],
]);
