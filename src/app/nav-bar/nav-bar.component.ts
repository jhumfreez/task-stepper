import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskType } from '../types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @Input() steps: Task[] = [];
  advance() {}
  previous() {}
}
