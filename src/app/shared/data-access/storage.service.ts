import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

// This service manages storing and retrieving data from local storage
@Injectable({
  providedIn: 'root',  // Makes this service available throughout the app
})
export class StorageService {
  // Observable to track changes in stored data
  private storageSubject = new BehaviorSubject<Record<string, any>>({});

  // Get the current state of stored data
  storage$ = this.storageSubject.asObservable();

  // Constructor is used to load initial data from local storage
  constructor() {
    // Load initial data from local storage when the service is created
    this.loadInitialData();
  }

  // Load data from local storage and update the observable
  private loadInitialData() {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
      this.storageSubject.next(JSON.parse(storedData));
    }
  }

  // Save data to local storage and update the observable
  saveData(key: string, value: any) {
    const currentData = this.storageSubject.value;
    const updatedData = { ...currentData, [key]: value };
    localStorage.setItem('appData', JSON.stringify(updatedData));
    this.storageSubject.next(updatedData);
  }

  // Get data by key from the observable
  getData(key: string) {
    return this.storageSubject.value[key];
  }
}
