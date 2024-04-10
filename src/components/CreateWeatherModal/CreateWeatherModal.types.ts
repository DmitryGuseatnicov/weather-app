import type { BaseSelectOption } from '@/components/UI/shared.types';
import type { WeatherTableValue } from '@/components/WeatherTable';
import type { WeatherType } from '@/store';

import type { DialogProps } from 'primereact/dialog';

export interface CreateWeatherModalProps extends DialogProps {
  formData: Partial<WeatherTableValue>;
  weatherTypeOptions?: WeatherType[];
  userOptions?: BaseSelectOption[];
}

export type FormikFormData = Omit<WeatherTableValue, 'temperature'> & { 'temperature': number };
