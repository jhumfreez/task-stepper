import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CompleteTask } from '../store/task.actions';
import { TaskService } from '../task.service';
import { Task } from '../types';

/**
 * Purely filler component with minimal functionality.
 */

@Component({
  selector: 'app-filler',
  templateUrl: './filler.component.html',
  styleUrls: ['./filler.component.css'],
})
export class FillerComponent implements OnInit {
  // @Input()
  // step: Task;
  // title: string;
  constructor(private store: Store, protected route: ActivatedRoute, protected taskService: TaskService) {

  }

  ngOnInit() {
    this.completeStep();
  }

  completeStep() {
    // this.taskService.completeTask(this.taskService.currentStep.taskType);
    // FIXME
    // this.store.dispatch(new CompleteTask(this.step.taskType));
  }
}
