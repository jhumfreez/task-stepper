import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'start-checkout',
      },
      {
        path: 'profile',
      },
      {
        path: 'trade-in',
      },
      {
        path: 'credit-application',
      },
      {
        path: 'schedule-delivery',
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
