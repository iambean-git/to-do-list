export interface Item {
    id: number;
    tenantId: string;
    name: string;
    memo: string;
    imageUrl?: string | null; // nullable 필드
    isCompleted: boolean;
}

export type ItemList = Item[];