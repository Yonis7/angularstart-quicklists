// Import necessary tools from Angular
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';

// Define our checklist component
@Component({
  selector: 'app-checklist', // Use this component as <app-checklist> in HTML
  template: `
    <!-- Display the checklist header if a checklist is found -->
    @if (checklist(); as checklist){
    <app-checklist-header [checklist]="checklist" />
    }
  `,
  imports: [ChecklistHeaderComponent], // Import the header component for displaying checklist details
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService); // Get the checklist service to manage data
  route = inject(ActivatedRoute); // Get the current route to access URL parameters

  // Convert route parameters to a reactive signal
  params = toSignal(this.route.paramMap);

  // Compute the current checklist based on the URL parameter
  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );
}
