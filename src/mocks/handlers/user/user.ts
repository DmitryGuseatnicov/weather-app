// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';

import type { User } from '@/store';

const BASE_PATH = '/weather-app/user';

const USER_NAME_LIST = [
  'Иванов Иван',
  'Петров Петр',
  'Сидоров Александр',
  'Смирнова Екатерина',
  'Козлов Дмитрий',
  'Николаева Ольга',
  'Морозова Татьяна',
  'Васильев Андрей',
  'Павлова Мария',
  'Кузнецов Алексей',
  'Соколов Иван',
  'Лебедев Сергей',
  'Козлова Елена',
  'Попов Артем',
  'Новикова Наталья',
  'Макаров Владимир',
  'Романова Анастасия',
  'Зайцев Михаил',
  'Борисов Денис',
  'Киселева Юлия',
  'Медведев Антон',
  'Соловьева Евгения',
  'Волков Павел',
  'Ломакина Ольга',
  'Федорова Екатерина',
  'Михайлова Алина',
  'Захарова Дарья',
  'Воробьев Артем',
  'Алексеева Ирина',
  'Григорьев Александр',
];

export const userRepository = new Map<number, User>();
USER_NAME_LIST.forEach((item, index) => {
  const [surname, name] = item.split(' ');

  userRepository.set(index + 1, { id: index + 1, name, surname });
});

export const userHandlers = [
  http.get(`${BASE_PATH}`, () => {
    return HttpResponse.json(Array.from(userRepository.values()));
  }),
];
