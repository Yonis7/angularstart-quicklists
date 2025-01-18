import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  template: `
    <header>
      <a routerLink="/home">Back</a>
      <h1>
        {{ checklist().title }}
      </h1>
      <div>
        <button (click)="resetChecklist.emit(checklist().id)">Reset</button>
        <button (click)="addItem.emit()">Add item</button>
      </div>
    </header>
  `,
  imports: [RouterLink],
  styles: [
    `
      button {
        margin-left: 1rem;
      }
    `,
  ],
})
export class ChecklistHeaderComponent {
  // This component receives a checklist object from the parent component
  checklist = input.required<Checklist>();
  // This component emits the event to add a new item to the checklist when the button is clicked
  addItem = output();

  // This component emits the event to remove the checklist when the button is clicked
  resetChecklist = output<RemoveChecklist>();
}
