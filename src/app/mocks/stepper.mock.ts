import { Task, Tasks, TaskStatus, TaskType } from '../types';

export const mockTasks: Tasks = [
  {
    label: 'Create Your Deal',
    taskType: TaskType.PlanSelection,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Profile',
    taskType: TaskType.Profile,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Trade-in',
    taskType: TaskType.TradeIn,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Accessories',
    taskType: TaskType.Accessories,
    status: TaskStatus.Pristine,
  },
  {
    label: 'F&I Products',
    taskType: TaskType.FIProducts,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Credit Application',
    taskType: TaskType.CreditApp,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Documents',
    taskType: TaskType.DocumentUpload,
    status: TaskStatus.Pristine,
  },
  {
    label: 'Schedule Delivery',
    taskType: TaskType.ScheduleDelivery,
    status: TaskStatus.Pristine,
  },
];
