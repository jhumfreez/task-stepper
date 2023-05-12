import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavContextEvent, Task } from '../types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // @Input() steps: Task[] = [];
  @Input() nextStep: Task;
  @Input() prevStep: Task;

  // Notify parent of intent to navigate, with context
  @Output('navigate') notifyNav: EventEmitter<NavContextEvent>;

  advance() {
    this.notifyNav.next('next');
  }
  previous() {
    this.notifyNav.next('prev');
  }
  back() {
    this.notifyNav.next('back');
  }
  submit() {
    this.notifyNav.next('submit');
  }
}
