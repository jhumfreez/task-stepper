import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BUY_ROUTE_TASK_MAP } from '../app.routing.module';
import { TaskService } from '../task.service';
import { Task, TaskStatus, TaskType } from '../types';
@Component({
  selector: 'app-progress-stepper',
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
})
export class ProgressStepperComponent {
  @Input()
  isLoading = false;

  isLinear = false;
  isLocked = false;
  // Note: Forms can inform stepper of incomplete steps
  // tempForm = new FormGroup({
  //   noop: new FormControl(''),
  // });
  // Note: Mat Stepper can provide info about the step (getSteps)
  @Input() steps: Task[] = [];
  taskStatus = TaskStatus;
  route_task_map = BUY_ROUTE_TASK_MAP;

  constructor(private router: Router, private taskStepper: TaskService) {
    // breakpointObserver: BreakpointObserver
    // Note: puts stepper in vertical orienation
    // this.$stepperOrientation = breakpointObserver
    //   .observe('(min-width: 576px)')
    //   .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  selectionChanged(event: StepperSelectionEvent) {
    const routeSegment = BUY_ROUTE_TASK_MAP.get(event.selectedIndex);
    this.router.navigate(['/' + routeSegment]);
  }
}
