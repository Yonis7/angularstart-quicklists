import { Component, input, output } from '@angular/core';
// Import the ChecklistItem interface to define the structure of checklist items
import { ChecklistItem } from '../../shared/interfaces/checklist-item';
import { RemoveChecklistItem } from '../../shared/interfaces/checklist-item';

// Define our checklist item list component
@Component({
  selector: 'app-checklist-item-list', // Use this component as <app-checklist-item-list> in HTML
  template: `
    <!-- Section to display the list of checklist items -->
    <section>
      <ul>
        <!-- Loop through each checklist item and display its title -->
        @for (item of checklistItems(); track item.id){
        <li>
          <div>
            @if (item.checked){
            <span>✅</span>
            }
            {{ item.title }}
          </div>
          <div>
            <button (click)="toggle.emit(item.id)">Toggle</button>
            <button (click)="edit.emit(item)">Edit</button>
            <button (click)="delete.emit(item.id)">Delete</button>
          </div>
        </li>
        } @empty {
        <div>
          <h2>Add an item</h2>
          <p>Click the add button to add your first item to this quicklist</p>
        </div>
        }
      </ul>
    </section>
  `,
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
export class ChecklistItemListComponent {
  // Input property to receive the list of checklist items from the parent component
  checklistItems = input.required<ChecklistItem[]>();

  toggle = output<RemoveChecklistItem>();

  delete = output<RemoveChecklistItem>();
  edit = output<ChecklistItem>();
}
