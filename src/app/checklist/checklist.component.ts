// Import necessary tools from Angular
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';
import { FormBuilder } from '@angular/forms';
import { ChecklistItemService } from './data-access/checklist-item.service';
import { ChecklistItem } from '../shared/interfaces/checklist-item';
import { ModalComponent } from '../shared/ui/modal.component';
import { FormModalComponent } from '../shared/ui/form-modal.component';
import { ChecklistItemListComponent } from './ui/checklist-item-list.component';

// Define our checklist component
@Component({
  selector: 'app-checklist', // Use this component as <app-checklist> in HTML
  template: `
    <!-- Display the checklist header if a checklist is found -->
    @if (checklist(); as checklist){
    <app-checklist-header
      [checklist]="checklist"
      (addItem)="checklistItemBeingEdited.set({})"
      (resetChecklist)="checklistItemService.reset$.next($event)"
    />
    <app-checklist-item-list
      [checklistItems]="items()"
      (toggle)="checklistItemService.toggle$.next($event)"
    />
    }

    <app-modal [isOpen]="!!checklistItemBeingEdited()">
      <ng-template>
        <app-form-modal
          title="Create item"
          [formGroup]="checklistItemForm"
          (save)="
      checklistItemBeingEdited()?.id
        ? checklistItemService.edit$.next({
          id: checklistItemBeingEdited()!.id!,
          data: checklistItemForm.getRawValue(),
        })
        : checklistItemService.add$.next({
          item: checklistItemForm.getRawValue(),
          checklistId: checklist()?.id!,
        })
    "
          (close)="checklistItemBeingEdited.set(null)"
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
  imports: [
    ChecklistHeaderComponent,
    ModalComponent,
    FormModalComponent,
    ChecklistItemListComponent,
  ], // Import the header component for displaying checklist details, and the modal component for creating new checklist items, and the form modal component for creating new checklist items
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        background: var(--color-light);
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 1rem;

        button {
          margin-left: 1rem;
        }
      }
    `,
  ],
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService); // Get the checklist service to manage data

  // Get the checklist item service to manage checklist items
  checklistItemService = inject(ChecklistItemService);

  route = inject(ActivatedRoute); // Get the current route to access URL parameters

  // Convert route parameters to a reactive signal
  params = toSignal(this.route.paramMap);

  // Get the FormBuilder tool to help create and manage forms
  formBuilder = inject(FormBuilder);

  // Signal to keep track of which checklist item is being edited
  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  // Compute the current checklist based on the URL parameter
  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );

  // Define the structure of our checklist item form with a title field
  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  // This constructor runs when the page is loaded and sets up our
  constructor() {
    // Watch for changes to the checklist item being edited
    effect(() => {
      const checklistItem = this.checklistItemBeingEdited();

      if (!checklistItem) {
        this.checklistItemForm.reset();
      } else {
        this.checklistItemForm.patchValue({
          title: checklistItem.title,
        });
      }
    });
  }
  //  This computed property filters the list of checklist items based on the current checklist ID
  items = computed(() =>
    this.checklistItemService
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id'))
  );
}
