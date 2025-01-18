import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { AddChecklist, Checklist } from '../interfaces/checklist';
import { StorageService } from './storage.service';

// Define the structure of our state, which holds all checklists
export interface ChecklistsState {
  checklists: Checklist[];
  loaded: boolean;
  error: string | null;
}

// This service manages the checklists data and operations
@Injectable({
  providedIn: 'root', // Makes this service available throughout the app
})
export class ChecklistService {
  // Holds the current state of checklists
  private state = signal<ChecklistsState>({
    checklists: [], // Start with an empty list of checklists
    loaded: false, // Indicates if the checklists have been loaded
    error: null, // Holds any error messages
  });

  // Provides a way to get the current list of checklists
  checklists = computed(() => this.state().checklists);

  // Provides a way to check if checklists have been loaded
  loaded = computed(() => this.state().loaded);

  // A stream that we can use to add new checklists
  add$ = new Subject<AddChecklist>();

  // Inject the storage service to manage local storage
  private storageService = inject(StorageService);

  // A stream to load checklists from local storage
  private checklistsLoaded$ = this.storageService.loadChecklists();

  constructor() {
    // Listen for new checklists to be added and update the state
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      }))
    );

    // Listen for checklists to be loaded and update the state
    this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklists) =>
        this.state.update((state) => ({
          ...state,
          checklists,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklists(this.checklists());
      }
    });
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
