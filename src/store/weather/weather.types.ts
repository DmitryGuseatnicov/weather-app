import type { User } from '@/store';

export interface Temperature {
  value?: number;
  unitOfMeasure?: 'celsius' | 'fahrenheit';
}

export interface WeatherType {
  id: number;
  name: string;
  image: string;
}

export interface WeatherNote {
  id: number;
  weatherType?: WeatherType;
  temperature: number;
  user?: User;
  date: string;
  comment: string;
}

export interface CreateWeatherNodeData extends Partial<Omit<WeatherNote, 'weatherType' | 'user'>> {
  weatherType?: number;
  user?: number;
}
