// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';

import { userRepository } from '@/mocks/handlers/user';
import type { MockHttpRequest } from '@/mocks/types';
import { getRandomItemFromRepository } from '@/mocks/utils';
import type { WeatherNote } from '@/store';
import { getRandomInt } from '@/utils';
import { getRelativeDayDifferenceToday } from '@/utils/date';

import { weatherTypeRepository } from './weatherType';

import type { WeatherNoteDBEntity } from './weather.types';

const BASE_PATH = '/weather-app/weather-note';

const WEATHER_NONE_LIST = Array.from({ length: 360 }, (_, index) => ({
  id: index + 1,
  user: getRandomItemFromRepository(userRepository)?.id,
  weatherType: getRandomItemFromRepository(weatherTypeRepository)?.id,
  temperature: getRandomInt(-5, 5),
  date: getRelativeDayDifferenceToday(-356 + index).toISOString(),
  comment: 'Какой то коментарийэ',
}));

const weatherNoteRepository = new Map<number, WeatherNoteDBEntity>();
WEATHER_NONE_LIST.map((item) => weatherNoteRepository.set(item.id, item));

const getIsWeatherNoteIncludeInInterval = (weatherNote: WeatherNoteDBEntity, from: string, to: string) => {
  const itemDate = new Date(weatherNote.date);
  const dateFrom = new Date(from);
  const dateTo = new Date(to);

  return itemDate >= dateFrom && itemDate <= dateTo;
};

const convertDBWeatherToWeatherNode = (note: WeatherNoteDBEntity): WeatherNote => {
  return {
    ...note,
    user: note.user ? userRepository.get(note.user) : undefined,
    weatherType: note.weatherType ? weatherTypeRepository.get(note.weatherType) : undefined,
  };
};

const getWeatherNoteList = ({ request }: MockHttpRequest) => {
  const url = new URL(request.url);

  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');

  if (from && to) {
    return HttpResponse.json(
      Array.from(weatherNoteRepository.values())
        .filter((note) => getIsWeatherNoteIncludeInInterval(note, from, to))
        .map(convertDBWeatherToWeatherNode),
      { status: 200 },
    );
  }

  return HttpResponse.json(Array.from(weatherNoteRepository.values()).reverse().map(convertDBWeatherToWeatherNode), {
    status: 200,
  });
};

const postWeatherNote = async ({ request }: MockHttpRequest) => {
  const weatherNote = (await request.json()) as WeatherNoteDBEntity;
  weatherNote.id = weatherNoteRepository.size + 1;

  weatherNoteRepository.set(weatherNote.id, weatherNote);

  return HttpResponse.json(convertDBWeatherToWeatherNode(weatherNote), { status: 201 });
};

const patchWeatherNote = async ({ request, params }: MockHttpRequest) => {
  console.log(params.id);
  const weatherNote = weatherNoteRepository.get(Number(params.id));
  console.log(weatherNote);

  if (!weatherNote?.id) {
    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const weatherNotePatch = (await request.json()) as Partial<WeatherNoteDBEntity>;
  const weatherNoteUpdated = { ...weatherNote, ...weatherNotePatch };

  weatherNoteRepository.set(weatherNote.id, weatherNoteUpdated);

  return HttpResponse.json(convertDBWeatherToWeatherNode(weatherNote), { status: 201 });
};

const deleteWeatherNote = async ({ params }: MockHttpRequest) => {
  const weatherNote = weatherNoteRepository.get(Number(params.id));

  if (!weatherNote) {
    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const success = weatherNoteRepository.delete(Number(params.id));

  if (success) {
    return HttpResponse.json(convertDBWeatherToWeatherNode(weatherNote), { status: 200 });
  }

  return HttpResponse.json({ error: 'Bad Request' }, { status: 400 });
};

const deleteWeatherNoteList = async ({ request }: MockHttpRequest) => {
  const { ids = [] } = (await request.json()) as { ids: string[] };

  const deletedItems: WeatherNote[] = [];

  ids.forEach((id) => {
    const weatherNote = weatherNoteRepository.get(Number(id));
    const success = weatherNoteRepository.delete(Number(id));

    if (success && weatherNote) {
      deletedItems.push(convertDBWeatherToWeatherNode(weatherNote));
    }
  });

  return HttpResponse.json(deletedItems, { status: 200 });
};

export const weatherNoteHandlers = [
  http.get(BASE_PATH, getWeatherNoteList),
  http.post(BASE_PATH, postWeatherNote),
  http.post(`${BASE_PATH}/delete`, deleteWeatherNoteList),
  http.patch(`${BASE_PATH}/:id`, patchWeatherNote),
  http.delete(`${BASE_PATH}/:id`, deleteWeatherNote),
];
