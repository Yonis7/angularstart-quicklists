// This is our app's main page - like the home screen on your phone
import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal.component';
import { FormBuilder } from '@angular/forms';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistListComponent } from './ui/checklist-list.component';

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
          (save)="checklistService.add$.next(checklistForm.getRawValue())"
        />
      </ng-template>
    </app-modal>

    <section>
      <h2>Your checklists</h2>
      <app-checklist-list [checklists]="checklistService.checklists()" />
    </section>
  `,
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent], // Add popup window capability to our page
})
// This class defines the main functionality for our home page
export default class HomeComponent {
  checklistService = inject(ChecklistService); // Tool to manage checklists

  formBuilder = inject(FormBuilder); // Tool to help create and manage forms

  // Keeps track of which checklist we're editing (null means none)
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  // Defines the structure of our checklist form with a title field
  checklistForm = this.formBuilder.nonNullable.group({
    title: [''], // Text field for the checklist title
  });

  // This constructor runs when the page is loaded and sets up our form behavior, like a robot assistant for the form fields and buttons on the page.
  constructor() {
    // Watch for changes to the checklist being edited
    effect(() => {
      const checklist = this.checklistBeingEdited();

      // If no checklist is being edited, reset the form to be empty
      if (!checklist) {
        this.checklistForm.reset();
      }
    });
  }
}
