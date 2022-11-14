import { Task, TaskType } from '../types';

export const mockTasks: Task[] = [
  new Task('Create Your Deal', TaskType.PlanSelection, true, false),
  new Task('Profile', TaskType.Profile, true, false),
  new Task('Trade-in',TaskType.TradeIn, true),
  new Task('Accessories',TaskType.Accessories, true),
  new Task('F&I Products',TaskType.FIProducts, false),
  new Task('Credit Application',TaskType.CreditApp, false),
  new Task('Documents',TaskType.DocumentUpload, true),
  new Task('Schedule Delivery',TaskType.ScheduleDelivery, true, false)
];
