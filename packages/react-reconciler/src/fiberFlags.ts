// no fiber
export const NoFlags = 0b0000001;
// add fiber
export const Placement = 0b0000010;
// update fiber
export const Update = 0b0000100;
// delete fiber
export const ChildDeletion = 0b0001000;

export type Flags = number;