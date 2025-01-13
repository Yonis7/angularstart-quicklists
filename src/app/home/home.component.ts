// This is our app's main page - like the home screen on your phone
import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home', // This tells Angular where to put our home page
  template: `
    <!-- Top section of our page with title and main button -->
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistBeingEdited.set({})">Add Checklist</button>
    </header>

    <!-- Popup window for editing checklists - like a digital Post-it note -->
    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="
            checklistBeingEdited()?.title
              ? checklistBeingEdited()!.title!
              : 'Add Checklist'
          "
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
        />
      </ng-template>
    </app-modal>
  `,
  imports: [ModalComponent, FormModalComponent], // Add popup window capability to our page
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder); // Get form creation tools

  // Keeps track of which checklist we're editing (null means none)
  // Think of it like a spotlight - it highlights the checklist being worked on
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  // Setup the form structure for checklists
  checklistForm = this.formBuilder.nonNullable.group({
    title: [''], // Text field for checklist title
  });
}
