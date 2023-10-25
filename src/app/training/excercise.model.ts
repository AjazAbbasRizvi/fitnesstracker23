export interface Excercise {
  id: string;
  name: string;
  duration: number;
  calories: any;
  date?: any;
  state?: 'completed' | 'cancelled' | null;
  userid?: any;
}
