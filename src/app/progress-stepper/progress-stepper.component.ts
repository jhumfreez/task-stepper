import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { NavigationStart, Router } from '@angular/router';
import { BUY_ROUTE_TASK_MAP } from '../app.routing.module';
import { TaskService } from '../task.service';
import { Task, TaskStatus, TaskType } from '../types';
@Component({
  selector: 'app-progress-stepper',
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
})
export class ProgressStepperComponent implements AfterViewInit {
  @Input()
  isLoading = false;

  @ViewChild('stepper')
  stepper: MatStepper;

  isLinear = false;
  isLocked = false;

  @Input() steps: Task[] = [];
  taskStatus = TaskStatus;
  route_task_map = BUY_ROUTE_TASK_MAP;

  constructor(private router: Router, private taskService: TaskService) {}

  ngAfterViewInit(): void {
    this.taskService.activateTask(this.stepper.selectedIndex);
    // TODO: Doesn't work, so handle in route guard
    // if (!this.taskService.currentStep?.availableOnCashDeal) {
    //   this.stepper.selectedIndex = TaskType.PlanSelection;
    // }
  }

  selectionChanged(event: StepperSelectionEvent) {
    const routeSegment = BUY_ROUTE_TASK_MAP.get(event.selectedIndex);
    this.taskService.navigateSteps(
      event.previouslySelectedIndex,
      event.selectedIndex
    );
    this.router.navigate(['/' + routeSegment]);
  }
}
