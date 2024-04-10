import { REQUIRED_FIELD } from '@/constants';

import type { FormikFormData } from './CreateWeatherModal.types';

export const validateCreateWeatherNodeForm = (data: Partial<FormikFormData>) => {
  const errors = {
    user: data.user?.id ? undefined : REQUIRED_FIELD,
    weatherType: data.weatherType?.id ? undefined : REQUIRED_FIELD,
    temperature: (data.temperature && data.temperature >= -50 && data.temperature <= 60)
      ? undefined
      : 'Допустимые интервал он -50 до 60',
  };

  return Object.fromEntries(Object.entries(errors).filter((item) => Boolean(item?.[1])));
};
