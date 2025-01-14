import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import {
  AddChecklistItem,
  ChecklistItem,
  RemoveChecklistItem,
} from '../../shared/interfaces/checklist-item';

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  // state
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);

  // sources
  // A stream that we can use to add new checklist items
  add$ = new Subject<AddChecklistItem>();

  // A stream that we can use to delete checklist items
  toggle$ = new Subject<RemoveChecklistItem>();

  constructor() {
    // Listen for new checklist items to be added and update the state
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: Date.now().toString(),  // Generate a unique ID using the current timestamp
            checklistId: checklistItem.checklistId,  // Associate the item with the correct checklist
            checked: false,  // New items start as unchecked
          },
        ],
      }))
    );

    // A reducer function to toggle the checked state of a checklist item by ID when it is clicked, and update the state accordingly.
    this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === checklistItemId
            ? { ...item, checked: !item.checked }
            : item
        ),
      }))
    );
  }
}
