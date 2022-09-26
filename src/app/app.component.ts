import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleDealHttpService } from './mocks/fake.http.service';
import { TaskService } from './task.service';
import { Task } from './types';
/**
 * Goals:
 * - Update step/task list on navigation or upon arrival on routed component after.
 * - Update progress stepper to only show available task if context changes.
 * - Only update the necessary tasks and no more.
 * - (optional) Guard routes to steps that are currently unavailable.
 */

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  steps: Task[] = [];
  task$: Observable<Task[]>;
  constructor(
    private fakeDealService: SimpleDealHttpService,
    private taskService: TaskService
  ) {
    this.task$ = this.taskService.getSteps();
  }
  setCashDeal() {
    // Determine cash only status
    this.fakeDealService.fetchMockData(true).subscribe((isCashOnly) => {
      if (isCashOnly) {
        this.taskService.handleCashDeal();
      }
    });
  }
}
