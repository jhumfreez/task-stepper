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

  // Note: Mat Stepper can provide info about the step (getSteps)
  @ViewChild('stepper')
  stepper: MatStepper;

  isLinear = false;
  isLocked = false;
  // Note: Forms can inform stepper of incomplete steps
  // tempForm = new FormGroup({
  //   noop: new FormControl(''),
  // });
  @Input() steps: Task[] = [];
  taskStatus = TaskStatus;
  route_task_map = BUY_ROUTE_TASK_MAP;

  constructor(private router: Router, private taskService: TaskService) {
    // breakpointObserver: BreakpointObserver
    // Note: puts stepper in vertical orienation
    // this.$stepperOrientation = breakpointObserver
    //   .observe('(min-width: 576px)')
    //   .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngAfterViewInit(): void {
    // TODO: Doesn't work, so handle in route guard
    if (!this.taskService.currentStep?.availableOnCashDeal) {
      this.stepper.selectedIndex = TaskType.PlanSelection;
    }
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
