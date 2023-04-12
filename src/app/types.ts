export enum TaskType {
  PlanSelection,
  Profile,
  TradeIn,
  Accessories,
  Products,
  CreditApp,
  DocumentUpload,
  ScheduleDelivery,
}

export type LastLockableTask = TaskType.CreditApp | TaskType.DocumentUpload;

// Just an idea: mutually exclusive states
// However: What happens when a step is invalidated or hidden, and then it comes back after being completed? Should it be reset?
export enum TaskStatus {
  // Not visited, not modified
  Pristine = 'pristine',
  // Task completion in progress
  Active = 'active',
  Visited = 'visited',
  Skipped = 'skipped',
  Hidden = 'hidden',
  // Assumption: Locked steps cannot be hidden because task will not be re-evaluated.
  // Task is read-only and cannot be visited
  Locked = 'locked',
}

export interface Task {
  label: Readonly<string>;
  taskType: Readonly<TaskType>;
  // Some tasks cannot be skipped
  optional: Readonly<boolean>;
  availableOnCashDeal: Readonly<boolean>;
  status: TaskStatus;
}

export type TaskConfig = Pick<
  Task,
  'label' | 'taskType' | 'optional' | 'availableOnCashDeal'
>;

// Note: Uncertain about handling for stand alone steps/pages
export class Task {
  constructor(
    public label: string,
    public taskType: Readonly<TaskType>,
    public availableOnCashDeal: boolean = true,
    public optional: boolean = true
  ) {
    this.status = TaskStatus.Pristine;
  }
}

export interface TaskChangeEvent {
  prevTask: TaskType;
  nextTask: TaskType;
}

export type LockedTask = Readonly<Task>;
export type Tasks = Task[] | LockedTask[];
