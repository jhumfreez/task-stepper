import { Component, OnInit } from '@angular/core';;
// import { StepperService } from '../shared/services/stepper/stepper.service';

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
  // $steps = this.stepperService.steps;
  // $stepperOrientation: Observable<StepperOrientation>;

  constructor(
    // private stepperService: StepperService,
    // breakpointObserver: BreakpointObserver
  ) {
    // Note: puts stepper in vertical orienation 
    // this.$stepperOrientation = breakpointObserver
    //   .observe('(min-width: 576px)')
    //   .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {}
}
