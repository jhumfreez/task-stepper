import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatModule } from './mat.module';
import { ProgressStepperComponent } from './progress-stepper/progress-stepper.component';
import { TaskState } from './store/task.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleComponent } from './example-component/example-component.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([TaskState]),
    NgxsResetPluginModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [AppComponent, ExampleComponent, ProgressStepperComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
