import { Task, TaskConfig, TaskType } from './types';
import { extractConfig } from './utils';

export const INIT_TASKS: Task[] = [
  new Task('Choose Your Deal', TaskType.PlanSelection, true, false),
  new Task('Profile', TaskType.Profile, true, false),
  new Task('Trade-in', TaskType.TradeIn, true, true),
  new Task('Accessories', TaskType.Accessories, true, true),
  new Task('Insurance', TaskType.FIProducts, false, true),
  new Task('Credit Application', TaskType.CreditApp, false, true),
  new Task('Documents', TaskType.DocumentUpload, true, true),
  new Task('Schedule Delivery', TaskType.ScheduleDelivery, true, false),
];

// Oof...
export const TASK_CONFIG = new Map<TaskType, TaskConfig>([
  [TaskType.PlanSelection, extractConfig(INIT_TASKS[TaskType.PlanSelection])],
  [TaskType.Profile, extractConfig(INIT_TASKS[TaskType.Profile])],
  [TaskType.TradeIn, extractConfig(INIT_TASKS[TaskType.TradeIn])],
  [TaskType.Accessories, extractConfig(INIT_TASKS[TaskType.Accessories])],
  [TaskType.FIProducts, extractConfig(INIT_TASKS[TaskType.FIProducts])],
  [TaskType.CreditApp, extractConfig(INIT_TASKS[TaskType.CreditApp])],
  [TaskType.DocumentUpload, extractConfig(INIT_TASKS[TaskType.DocumentUpload])],
  [
    TaskType.ScheduleDelivery,
    extractConfig(INIT_TASKS[TaskType.ScheduleDelivery]),
  ],
]);
