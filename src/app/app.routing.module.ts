import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TASK_CONFIG } from './constants';
import { ExampleComponent } from './example-component/example-component.component';
import { FillerComponent } from './filler-component/filler.component';
import { TaskType } from './types';

/**
 * Step 1: Start Checkout
 * Step 2: Contact Info
 * Step 3: Trade-in
 * Step 4: Accessories
 * Step 5: Financing Application
 * Step 6: Documents
 * Step 7: Final Review
 *
 * Post-submit: Purchase Review
 */

export enum RoutePath {
  PlanSelection = 'start-checkout',
  Profile = 'profile',
  TradeIn = 'trade-in',
  Accessories = 'accessories',
  Products = 'insurance',
  CreditApp = 'credit-application',
  DocumentUpload = 'documents',
  ScheduleDelivery = 'schedule-delivery',
}

export const BUY_ROUTE_TASK_MAP = new Map([
  [TaskType.PlanSelection, RoutePath.PlanSelection],
  [TaskType.Profile, RoutePath.Profile],
  [TaskType.TradeIn, RoutePath.TradeIn],
  [TaskType.Accessories, RoutePath.Accessories],
  [TaskType.Products, RoutePath.Products],
  [TaskType.CreditApp, RoutePath.CreditApp],
  [TaskType.DocumentUpload, RoutePath.DocumentUpload],
  [TaskType.ScheduleDelivery, RoutePath.ScheduleDelivery],
]);

// TODO: Guard finance/lease-only routes

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutePath.PlanSelection,
        title: 'Create Your Deal',
        component: FillerComponent,
        // Not sure if I want to use this or not
        data: {
          config: TASK_CONFIG[TaskType.PlanSelection]
        }
      },
      {
        path: RoutePath.Profile,
        title: 'Profile',
        component: ExampleComponent,
      },
      {
        path: RoutePath.TradeIn,
        title: 'Trade-in',
        component: FillerComponent,
      },
      {
        path: RoutePath.Accessories,
        title: 'Accessories',
        component: FillerComponent,
      },
      {
        path: RoutePath.Products,
        title: 'F&I Products',
        component: FillerComponent,
      },
      {
        path: RoutePath.CreditApp,
        title: 'Credit App',
        component: FillerComponent,
      },
      {
        path: RoutePath.DocumentUpload,
        title: 'Documents',
        component: FillerComponent,
      },
      {
        path: RoutePath.ScheduleDelivery,
        title: 'Schedule Delivery',
        component: ExampleComponent,
      },
      {
        path: '**',
        redirectTo: 'start-checkout',
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
