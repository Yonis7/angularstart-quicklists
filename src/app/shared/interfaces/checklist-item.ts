import { RemoveChecklist } from './checklist';

export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  checked: boolean;
}

// This type represents a new checklist item without an ID or checklist ID yet (like a blank form)
export type AddChecklistItem = {
  item: Omit<ChecklistItem, 'id' | 'checklistId' | 'checked'>;  // The item details without ID or checklist ID
  checklistId: RemoveChecklist;  // The ID of the checklist this item belongs to
};

// This type represents editing an existing checklist item, including its ID and new data
export type EditChecklistItem = {
  id: ChecklistItem['id'];  // The ID of the item to edit
  data: AddChecklistItem['item'];  // The new details for the item
};

// This type represents the ID of a checklist item to be removed (like a delete request)
export type RemoveChecklistItem = ChecklistItem['id'];  // The ID of the item to remove
