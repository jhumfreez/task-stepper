import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TASK_CONFIG } from './constants';
import { ExampleComponent } from './example-component/example-component.component';
import { FillerComponent } from './filler-component/filler.component';
import { TaskType } from './types';

export enum RoutePath {
  RouteA = 'route A',
  RouteB = 'route B',
  RouteC = 'route C',
  RouteD = 'route D',
  RouteE = 'route E',
  RouteF = 'route F',
  RouteG = 'route G',
  RouteH = 'route H',
}

export const BUY_ROUTE_TASK_MAP = new Map([
  [TaskType.TaskA, RoutePath.RouteA],
  [TaskType.TaskB, RoutePath.RouteB],
  [TaskType.TaskC, RoutePath.RouteC],
  [TaskType.TaskD, RoutePath.RouteD],
  [TaskType.TaskE, RoutePath.RouteE],
  [TaskType.TaskF, RoutePath.RouteF],
  [TaskType.TaskG, RoutePath.RouteG],
  [TaskType.TaskH, RoutePath.RouteH],
]);

// TODO: Guard finance/lease-only routes

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutePath.RouteA,
        title: 'Route A',
        component: FillerComponent,
        // Not sure if I want to use this or not
        data: {
          config: TASK_CONFIG[TaskType.TaskA],
        },
      },
      {
        path: RoutePath.RouteB,
        title: 'Route B',
        component: ExampleComponent,
      },
      {
        path: RoutePath.RouteC,
        title: 'Route C',
        component: FillerComponent,
      },
      {
        path: RoutePath.RouteD,
        title: 'Route D',
        component: FillerComponent,
      },
      {
        path: RoutePath.RouteE,
        title: 'Route E',
        component: FillerComponent,
      },
      {
        path: RoutePath.RouteF,
        title: 'Route F',
        component: FillerComponent,
      },
      {
        path: RoutePath.RouteG,
        title: 'Route G',
        component: FillerComponent,
      },
      {
        path: RoutePath.RouteH,
        title: 'Route H',
        component: ExampleComponent,
      },
      {
        path: '**',
        redirectTo: RoutePath.RouteA,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
