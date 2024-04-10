import cnBind from 'classnames/bind';
import dayjs from 'dayjs';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

import { SYMBOLS_OF_TEMPERATURE_UNIT } from '@/constants';
import type { WeatherNote } from '@/store';

import styles from './WeatherTable.module.scss';

import type { WeatherTableColumnFiled, WeatherTableValue } from './WeatherTable.types';
import type { ColumnBodyOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';

const cx = cnBind.bind(styles);

export const weatherColumnTemplate = (
  onClick?: (data: WeatherTableValue) => void,
) => (
  data: WeatherTableValue, { field }: ColumnBodyOptions,
) => {
    const fieldTyped = field as WeatherTableColumnFiled;
    const { weatherType, temperature, user, date } = data;

    if (fieldTyped === 'date') {
      return <div className={cx('date')}>{dayjs(date).format('HH:mm:ss DD-MM-YYYY')}</div>;
    }

    if (fieldTyped === 'weatherType') {
      return (
        <div className={cx('weather-type')}>
          <img className={cx('weather-type-image')} src={weatherType?.image} alt="" /> {weatherType?.name ?? '-'}
        </div>
      );
    }

    if (fieldTyped === 'temperature') {
      return (
        <div>
          {`${temperature.value ?? '-'} ${SYMBOLS_OF_TEMPERATURE_UNIT[temperature.unitOfMeasure || 'celsius']}`}
        </div>
      );
    }

    if (fieldTyped === 'user') {
      return <div>{user?.label ?? '-'}</div>;
    }

    if (fieldTyped === 'edit') {
      return (
        <button className={cx('button-icon')} type="button" onClick={() => onClick?.(data)}>
          <i className={cx('edit-icon', 'pi pi-pencil')} />
        </button>
      );
    }

    if (fieldTyped === 'delete') {
      return (
        <button className={cx('button-icon')} type="button" onClick={() => onClick?.(data)}>
          <i className={cx('delete-icon', 'pi pi-trash')} />
        </button>
      );
    }
  };

export const filterColumnTemplate = (
  props: { userList?: WeatherTableValue['user'][] },
) => (
  { value, filterCallback, field }: ColumnFilterElementTemplateOptions,
) => {
    if (field === 'user') {
      return (
        <MultiSelect
          value={value}
          options={props.userList}
          onChange={(e) => filterCallback(e.value)}
          optionLabel="label"
          placeholder="Выберете кто заполнял"
          className="p-column-filter"
          style={{ width: '250px' }}
        />
      );
    }

    if (field === 'date') {
      return <Calendar value={value} onChange={(e) => filterCallback(e.value)} selectionMode="range" inline />;
    }
  };

export const convertWeatherNotoToTableValue = (weatherNoteList: WeatherNote[]): WeatherTableValue[] => {
  return (
    weatherNoteList?.map((item) => ({
      ...item,
      date: item.date,
      user: item.user
        ? {
            id: item.user.id ?? 0,
            label: `${item.user?.name} ${item.user?.surname}`,
          }
        : undefined,
      temperature: {
        value: item.temperature,
        unitOfMeasure: 'celsius',
      },
    })) ?? []
  );
};
