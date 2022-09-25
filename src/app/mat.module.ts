import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

// Note about shared modules: https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-a-shared-module-provides-a-service-to-a-lazy-loaded-module
// More concerns: https://leandromerli.com/angular-dont-use-shared-modules/

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    // list of icon fonts: https://fonts.google.com/icons
    /* Tip:
    In thinking about accessibility, it is useful to place icon use into one of three categories:
    Decorative: the icon conveys no real semantic meaning and is purely cosmetic.
    Interactive: a user will click or otherwise interact with the icon to perform some action.
    Indicator: the icon is not interactive, but it conveys some information, such as a status. This includes using the icon in place of text inside of a larger message.
    */
    /* Tip 2: 
    Theming: 
    - https://developers.google.com/fonts/docs/material_icons#styling_icons_in_material_design
    - https://material.angular.io/guide/theming-your-components
    - https://material.angular.io/guide/theming
    */
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class MatModule {}
