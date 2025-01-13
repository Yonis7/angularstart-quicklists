// Get tools needed for building forms and displaying data
import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',    // Name tag for this popup form
  template: `
    <!-- Top section with title and close button -->
    <header>
      <h2>{{ title() }}</h2>
      <button (click)="close.emit()">close</button>
    </header>

    <!-- Form section that creates input fields automatically -->
    <section>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
        @for (control of formGroup().controls | keyvalue; track control.key){
        <div>
          <!-- Create label and input pair for each form field -->
          <label [for]="control.key">{{ control.key }}</label>
          <input
            [id]="control.key"
            type="text"
            [formControlName]="control.key"
          />
        </div>
        }
        <button type="submit">Save</button>
      </form>
    </section>
  `,
  imports: [ReactiveFormsModule, KeyValuePipe],    // Required tools for form handling
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>();    // Receives form structure from parent
  title = input.required<string>();           // Receives popup title from parent
  save = output();                            // Signals when save button clicked
  close = output();                           // Signals when close button clicked
}
