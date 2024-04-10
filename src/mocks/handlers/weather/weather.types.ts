import type { WeatherNote } from '@/store';

export interface WeatherNoteDBEntity extends Omit<WeatherNote, 'user' | 'weatherType'> {
  user?: number;
  weatherType?: number;
}
