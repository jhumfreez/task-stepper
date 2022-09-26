import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../types';
@Component({
  selector: 'app-progress-stepper',
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
})
export class ProgressStepperComponent implements OnInit {
  isLinear = false;
  isLocked = false;
  // Note: Forms can inform stepper of incomplete steps
  // tempForm = new FormGroup({
  //   noop: new FormControl(''),
  // });
  // Note: Stepper can provide info about the step (getSteps)
  @Input() steps: Task[] = [];
  taskStatus = TaskStatus;

  constructor() {
    // breakpointObserver: BreakpointObserver
    // Note: puts stepper in vertical orienation
    // this.$stepperOrientation = breakpointObserver
    //   .observe('(min-width: 576px)')
    //   .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {}
}
