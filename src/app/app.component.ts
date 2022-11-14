import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { BUY_ROUTE_TASK_MAP } from './app.routing.module';
import { SimpleDealHttpService } from './mocks/fake.http.service';
import { TaskService } from './task.service';
import { Task, TaskChangeEvent, Tasks, TaskType } from './types';
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
  debug = true;
  task$: Observable<Tasks>;
  isLoading = false;
  constructor(
    private fakeDealService: SimpleDealHttpService,
    protected taskService: TaskService,
    private router: Router
  ) {
    this.task$ = this.taskService.steps;
  }

  activateTask(taskType: TaskType) {
    this.taskService.activateTask(taskType);
    // TODO: Doesn't work, so handle in route guard
    // if (!this.taskService.currentStep?.availableOnCashDeal) {
    //   this.stepper.selectedIndex = TaskType.PlanSelection;
    // }
  }

  taskChanged(taskChange: TaskChangeEvent) {
    this.taskService.navigateSteps(taskChange.prevTask, taskChange.nextTask);
    const routeSegment = BUY_ROUTE_TASK_MAP.get(taskChange.nextTask);
    this.router.navigate(['/' + routeSegment]);
  }

  setCashDeal() {
    this.toggleLoadingState();
    // Determine cash only status
    this.fakeDealService
      .fetchMockData(true)
      .pipe(finalize(() => this.toggleLoadingState()))
      .subscribe({
        next: (isCashOnly) => {
          if (isCashOnly) {
            this.taskService.handleCashDeal();
          }
        },
      });
  }

  toggleLoadingState() {
    this.isLoading = !this.isLoading;
  }

  resetSteps() {
    this.taskService.reset();
  }

  completeTask() {
    this.taskService.completeTask(this.taskService.currentStep.taskType);
  }
}
