import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MatModule } from './mat.module';
import { ProgressStepperComponent } from './progress-stepper/progress-stepper.component';
import { TaskState } from './store/task.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatModule,
    NgxsModule.forRoot([TaskState]),
    NgxsResetPluginModule.forRoot(),
  ],
  declarations: [AppComponent, HelloComponent, ProgressStepperComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
