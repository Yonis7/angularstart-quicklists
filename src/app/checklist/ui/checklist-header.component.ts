import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  template: `
    <header>
      <a routerLink="/home">Back</a>
      <h1>
        {{ checklist().title }}
      </h1>
      <div>
        <button (click)="addItem.emit()">Add item</button>
      </div>
    </header>
  `,
  imports: [RouterLink],
})
export class ChecklistHeaderComponent {
  // This component receives a checklist object from the parent component
  checklist = input.required<Checklist>();
  // This component emits the event to add a new item to the checklist when the button is clicked
  addItem = output();
}
