export interface Item {
  id: string;
  details: string;
  cost: string;
}
export interface Tag {
  id: number;
  name: string;
  icon?: string;
  isEssential: boolean;
  ownerId?: number;
}