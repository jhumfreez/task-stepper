export enum TaskType {
  PlanSelection,
  Profile,
  TradeIn,
  Accessories,
  FIProducts,
  CreditApp,
  DocumentUpload,
  ScheduleDelivery,
}

// Just an idea: mutually exclusive states
// However: What happens when a step is invalidated or hidden, and then it comes back after being completed? Should it be reset?
export enum TaskStatus {
  // Not visited, not modified
  Pristine = 'pristine',
  // Just an idea: record section has partial data
  // Dirty = 'dirty',
  // Task completion in progress
  Active = 'active',
  Complete = 'complete',
  Skipped = 'skipped',
  Hidden = 'hidden',
  // Assumption: Locked steps cannot be hidden because task will not be re-evaluated.
  Locked = 'locked',
}

export interface Task {
  taskType: TaskType;
  label: string;
  status: TaskStatus;
  // hidden: boolean;
  // skipped: boolean;
  // complete: boolean;
}

// export type Tasks = Task[];