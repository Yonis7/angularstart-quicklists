// This file defines which pages users can visit in the app and how to get there
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', // When URL has '/home'
    loadComponent: () => import('./home/home.component'), // Show the home page
  },
  {
    path: 'checklist/:id', // When URL has '/checklist/:id'
    loadComponent: () => import('./checklist/checklist.component'), // Show the checklist page
  },
  {
    path: '', // When URL is empty (root path)
    redirectTo: 'home', // Send users to the home page
    pathMatch: 'full', // Must match URL exactly
  },
];
