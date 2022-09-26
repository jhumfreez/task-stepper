import { Task, TaskStatus, TaskType } from '../types';

export const mockTasks: Task[] = [
  {
    label: 'Create Your Deal',
    taskType: TaskType.PlanSelection,
    status: TaskStatus.Pristine,
    optional: false,
  },
  {
    label: 'Profile',
    taskType: TaskType.Profile,
    status: TaskStatus.Pristine,
    optional: false,
  },
  {
    label: 'Trade-in',
    taskType: TaskType.TradeIn,
    status: TaskStatus.Pristine,
    optional: true,
  },
  {
    label: 'Accessories',
    taskType: TaskType.Accessories,
    status: TaskStatus.Pristine,
    optional: true,
  },
  {
    label: 'F&I Products',
    taskType: TaskType.FIProducts,
    status: TaskStatus.Pristine,
    optional: true,
  },
  {
    label: 'Credit Application',
    taskType: TaskType.CreditApp,
    status: TaskStatus.Pristine,
    optional: true,
  },
  {
    label: 'Documents',
    taskType: TaskType.DocumentUpload,
    status: TaskStatus.Pristine,
    optional: true,
  },
  {
    label: 'Schedule Delivery',
    taskType: TaskType.ScheduleDelivery,
    status: TaskStatus.Pristine,
    optional: false,
  },
];
