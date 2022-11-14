import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BUY_ROUTE_TASK_MAP } from '../app.routing.module';
import { Task, TaskChangeEvent, TaskStatus, TaskType } from '../types';
@Component({
  selector: 'app-progress-stepper',
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
})
export class ProgressStepperComponent implements AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  isLinear = false;
  isLocked = false;

  @Input() isLoading = false;

  @Input() steps: Task[] = [];

  @Output() activateTask = new EventEmitter<TaskType>();
  @Output() taskChanged = new EventEmitter<TaskChangeEvent>();

  taskStatus = TaskStatus;
  route_task_map = BUY_ROUTE_TASK_MAP;

  constructor() {}

  ngAfterViewInit(): void {
    this.activateTask.emit(this.stepper.selectedIndex);
  }

  selectionChanged(event: StepperSelectionEvent) {
    this.taskChanged.emit({
      prevTask: event.previouslySelectedIndex,
      nextTask: event.selectedIndex
    });
  }
}
