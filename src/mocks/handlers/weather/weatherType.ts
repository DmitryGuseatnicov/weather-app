// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';

import cloudy from '@/assets/images/cloudy.png';
import fog from '@/assets/images/fog.png';
import mist from '@/assets/images/mist.png';
import rainSmall from '@/assets/images/rain-small.png';
import rain from '@/assets/images/rain.png';
import snowMedium from '@/assets/images/snow-medium.png';
import snow from '@/assets/images/snow.png';
import sun from '@/assets/images/sun.png';
import thunderstorm from '@/assets/images/thunderstorm.png';
import weatherInPlaces from '@/assets/images/weather-in-places.png';
import windy from '@/assets/images/windy.png';
import type { WeatherType } from '@/store/weather/weather.types';

const WEATHER_TYPES_NAMES = [
  { name: 'Ясно', image: sun },
  { name: 'Преимущественно ясно', image: sun },
  { name: 'Местами облачная погода', image: weatherInPlaces },
  { name: 'Мгла', image: mist },
  { name: 'Туман', image: fog },
  { name: 'Ветрено', image: windy },
  { name: 'Cлегка ветрено', image: windy },
  { name: 'Облачная погода', image: cloudy },
  { name: 'Гроза', image: thunderstorm },
  { name: 'Дождь', image: rain },
  { name: 'Сильный дождь', image: rain },
  { name: 'Моросящий дождь', image: rainSmall },
  { name: 'Изморозь', image: rainSmall },
  { name: 'Снег', image: snow },
  { name: 'Сильный снегопад', image: snowMedium },
  { name: 'Cнежная буря', image: snowMedium },
  { name: 'Замерзающий дождь', image: snowMedium },
  { name: 'Kедяной дождь', image: snowMedium },
  { name: 'Cнег с дождем', image: snowMedium },
];

export const weatherTypeRepository = new Map<number, WeatherType>();
WEATHER_TYPES_NAMES.map((item, index) => weatherTypeRepository.set(
  index + 1, { id: index + 1, name: item.name, image: item.image },
));

const BASE_PATH = '/weather-app/weather-type';

export const weatherTypeHandlers = [
  http.get(BASE_PATH, () => {
    return HttpResponse.json(Array.from(weatherTypeRepository.values()), { status: 200 });
  }),
];
