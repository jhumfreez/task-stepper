import { Task, TaskType } from './types';

export const INIT_TASKS: Task[] = [
  new Task('Create Your Deal', TaskType.PlanSelection, true, false),
  new Task('Profile', TaskType.Profile, true, false),
  new Task('Trade-in', TaskType.TradeIn, true, true),
  new Task('Accessories', TaskType.Accessories, true, true),
  new Task('F&I Products', TaskType.FIProducts, false, true),
  new Task('Credit Application', TaskType.CreditApp, false, true),
  new Task('Documents', TaskType.DocumentUpload, true, true),
  new Task('Schedule Delivery', TaskType.ScheduleDelivery, true, false),
];
