import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.css'],
})
export class ExampleComponent {
  label: string = '';
  constructor(protected route: ActivatedRoute) {}
}
