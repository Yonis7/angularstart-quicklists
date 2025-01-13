import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  contentChild,
  input,
  TemplateRef,
  inject,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `<div></div>`,
})
export class ModalComponent {
  // Like a window manager that controls our popup
  dialog = inject(Dialog);

  // Required inputs from parent component:
  isOpen = input.required<boolean>();      // Acts like a light switch - ON (true) shows popup, OFF (false) hides it
  template = contentChild.required(TemplateRef);  // The content we'll show inside the popup window

  constructor() {
    // Watch for changes (like a security camera) to know when to show/hide the popup
    effect(() => {
      const isOpen = this.isOpen();

      if (isOpen) {
        // When isOpen is true (ON), show the popup window with these settings:
        this.dialog.open(this.template(), {
          panelClass: 'dialog-container',    // Apply special styling to make it look nice
          hasBackdrop: false,                // Don't dim the background behind the popup
        });
      } else {
        // When isOpen is false (OFF), close all popup windows
        this.dialog.closeAll();
      }
    });
  }
}
