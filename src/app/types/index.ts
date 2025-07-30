export interface Item {
  id: string;
  details: string;
  cost: string; // Keep as string for form handling
  tags: number[];  
}

export interface DatabaseItem {
  id?: number; // Optional for new items
  details: string;
  cost: number; // Number for database
  tags: number[];
}

export interface Tag {
  id: number;
  name: string;
  icon?: string | null;
  isEssential: boolean;
  ownerId: number | null;
  updated_at?: Date | null;
  created_at?: Date;
  deleted_at?: Date | null;
}

export interface ReceiptData  {
  headline: string;
  items: DatabaseItem[] // Use DatabaseItem for server-side
}
