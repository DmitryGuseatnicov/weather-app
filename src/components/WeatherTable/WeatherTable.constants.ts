import type { WeatherTableColumnItem } from './WeatherTable.types';

export const WEATHER_TABLE_COLUMNS: WeatherTableColumnItem[] = [
  {
    header: 'Дата и время',
    field: 'date',
    filter: true,
    frozen: true,
    isCustom: true,
    showFilterMenu: true,
    style: { width: '15%' },
  },
  {
    header: 'Температура',
    field: 'temperature',
    isCustom: true,
    showFilterMenu: false,
    style: { width: '10%' },
  },
  {
    header: 'Погода',
    field: 'weatherType',
    isCustom: true,
    showFilterMenu: false,
    style: { width: '20%' },
  },
  {
    header: 'Кто заполнил',
    field: 'user',
    isCustom: true,
    filter: true,
    showFilterMenu: true,
    style: { width: '20%' },
  },
  {
    header: 'Комментарий',
    field: 'comment',
    showFilterMenu: false,
    style: { width: '50%' },
  },
];

export const COLUMN_ICON_STYLES = { width: '50px' };
export const WEATHER_TABLE_STYLE = { minWidth: '1000px' };
export const WEATHER_TABLE_SCROLLER_OPTIONS = { itemSize: 56 };

export const DELETE_HEATHER_NOTES_SUCCESS = 'Запис(ь|и) удалены успешно';
export const DELETE_HEATHER_NOTES_ERROR = 'Запис(и|ей) прошло с ошибкой';
