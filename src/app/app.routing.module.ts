import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example-component/example-component.component';
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
  FIProducts = 'insurance',
  CreditApp = 'credit-application',
  DocumentUpload = 'documents',
  ScheduleDelivery = 'schedule-delivery',
}

export const BUY_ROUTE_TASK_MAP = new Map([
  [TaskType.PlanSelection, RoutePath.PlanSelection],
  [TaskType.Profile, RoutePath.Profile],
  [TaskType.TradeIn, RoutePath.TradeIn],
  [TaskType.Accessories, RoutePath.Accessories],
  [TaskType.FIProducts, RoutePath.FIProducts],
  [TaskType.CreditApp, RoutePath.CreditApp],
  [TaskType.DocumentUpload, RoutePath.DocumentUpload],
  [TaskType.ScheduleDelivery, RoutePath.ScheduleDelivery],
]);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutePath.PlanSelection,
        title: 'Create Your Deal',
        component: ExampleComponent,
      },
      {
        path: RoutePath.Profile,
        title: 'Profile',
        component: ExampleComponent,
      },
      {
        path: RoutePath.TradeIn,
        title: 'Trade-in',
        component: ExampleComponent,
      },
      {
        path: RoutePath.Accessories,
        title: 'Accessories',
        component: ExampleComponent,
      },
      {
        path: RoutePath.FIProducts,
        title: 'F&I Products',
        component: ExampleComponent,
      },
      {
        path: RoutePath.CreditApp,
        title: 'Credit App',
        component: ExampleComponent,
      },
      {
        path: RoutePath.DocumentUpload,
        title: 'Documents',
        component: ExampleComponent,
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
