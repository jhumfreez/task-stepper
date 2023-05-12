import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskType } from '../types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // @Input() steps: Task[] = [];
  @Input() nextStep: Task;
  @Input() prevStep: Task;

  // Navigate to next available step
  @Output('next') navNext: EventEmitter<Task>;
  // Navigate to previous available step
  @Output('prev') navPrev: EventEmitter<Task>;
  // Navigate to back to stepper page (return to the active/current step)
  @Output('back') navBack: EventEmitter<Task>;
  // Submit a document (for pages with forms) or conclude checkout process (final step)
  @Output('upload') upload: EventEmitter<Task>;

  advance() {}
  previous() {}
  back() {}
  submit() {}
}
