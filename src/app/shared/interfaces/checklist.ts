// Defines the structure for checklist items throughout the app
export interface Checklist {
    id: string;      // Unique identifier for each checklist
    title: string;   // Name/description of the checklist
}

// This type represents a new checklist without an ID yet (like a blank form)
export type AddChecklist = Omit<Checklist, 'id'>;

// This type represents editing an existing checklist, including its ID and new data
export type EditChecklist = { id: Checklist['id']; data: AddChecklist };

// This type represents the ID of a checklist to be removed (like a delete request)
export type RemoveChecklist = Checklist['id'];
