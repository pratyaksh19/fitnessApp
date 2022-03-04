export interface Excercise {
    id: string | null;
    name: string | null;
    duration?: number;
    calories?: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}