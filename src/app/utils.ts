import { TaskConfig, Task } from './types';

export const extractConfig = (task: Task): TaskConfig => {
  return {
    label: task.label,
    taskType: task.taskType,
    optional: task.optional,
    available: task.available,
  };
};
