export interface Item {
  id: string;
  details: string;
  cost: string;
}
export interface Tag {
  id: number;
  name: string;
  icon?: string | null;
  isEssential: boolean;
  ownerId?: number | null;
  updated_at?: Date | null;
  created_at?: Date;
  deleted_at?: Date | null;
}