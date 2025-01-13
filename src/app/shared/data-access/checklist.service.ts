// Import necessary tools from Angular and RxJS
import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { AddChecklist, Checklist } from '../interfaces/checklist';

// Define the structure of our state, which holds all checklists
export interface ChecklistsState {
  checklists: Checklist[];
}

// This service manages the checklists data and operations
@Injectable({
  providedIn: 'root',  // Makes this service available throughout the app
})
export class ChecklistService {
  // Holds the current state of checklists
  private state = signal<ChecklistsState>({
    checklists: [],  // Start with an empty list of checklists
  });

  // Provides a way to get the current list of checklists
  checklists = computed(() => this.state().checklists);

  // A stream that we can use to add new checklists
  add$ = new Subject<AddChecklist>();

  // This constructor sets up the service to listen for new checklists and update the state accordingly when they arrive.
  constructor() {
    // Listen for new checklists to be added and update the state
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      }))
    );
  }

  // Helper function to add an ID to a new checklist
  private addIdToChecklist(checklist: AddChecklist): Checklist {
    return { ...checklist, id: this.generateId() };
  }

  // Generates a unique ID for each new checklist
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
