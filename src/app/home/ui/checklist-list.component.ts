// Import necessary tools from Angular
import { Component, input } from '@angular/core';
import { Checklist } from '../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';

// Define our checklist list component
@Component({
  selector: 'app-checklist-list', // Use this component as <app-checklist-list> in HTML
  template: `
    <!-- Unordered list to display checklists -->
    <ul>
      <!-- Loop through each checklist and display its title -->
      @for (checklist of checklists(); track checklist.id){
      <li>
        <a [routerLink]="['/checklist', checklist.id]">{{ checklist.title }}</a>
      </li>
      } @empty {
      <!-- Message to show when there are no checklists -->
      <p>Click the add button to create your first checklist!</p>
      }
    </ul>
  `,
  imports: [RouterLink], // Import the RouterLink directive to navigate to checklist details
})
export class ChecklistListComponent {
  // Input property to receive the list of checklists from the parent component
  checklists = input.required<Checklist[]>();
}
