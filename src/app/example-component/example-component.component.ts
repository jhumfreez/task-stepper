import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Example component with a form (for filler)
 */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.css'],
})
export class ExampleComponent {
  label: string = '';
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(protected route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: this.fb.control('', [ Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.maxLength(20)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(30)]),
      dob: this.fb.control(null, [Validators.required, Validators.maxLength(10)]),
    });
  }
}
