import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CompleteTask } from '../store/task.actions';
import { Task } from '../types';

/**
 * Purely filler component with minimal functionality.
 */

@Component({
  selector: 'app-filler-component',
  templateUrl: './filler.component.html',
  styleUrls: ['./filler.component.css']
})
export class FillerComponent implements OnInit {
  @Input() step: Task
  constructor(private store: Store) { }

  ngOnInit() {
    this.completeStep();
  }

  completeStep(){
    this.store.dispatch(new CompleteTask(this.step.taskType));
  }
}