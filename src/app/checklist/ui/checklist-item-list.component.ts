import { Component, input } from '@angular/core';
// Import the ChecklistItem interface to define the structure of checklist items
import { ChecklistItem } from '../../shared/interfaces/checklist-item';

// Define our checklist item list component
@Component({
  selector: 'app-checklist-item-list',  // Use this component as <app-checklist-item-list> in HTML
  template: `
    <!-- Section to display the list of checklist items -->
    <section>
      <ul>
        <!-- Loop through each checklist item and display its title -->
        @for (item of checklistItems(); track item.id){
        <li>
          <div>
            {{ item.title }}
          </div>
        </li>
        } @empty {
        <!-- Message to show when there are no items in the checklist -->
        <div>
          <h2>Add an item</h2>
          <p>Click the add button to add your first item to this quicklist</p>
        </div>
        }
      </ul>
    </section>
  `,
})
export class ChecklistItemListComponent {
  // Input property to receive the list of checklist items from the parent component
  checklistItems = input.required<ChecklistItem[]>();
}
