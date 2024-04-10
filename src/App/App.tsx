import cnBind from 'classnames/bind';
import { useMemo, useState } from 'react';

import { WeatherChart } from '@/components/WeatherChart';
import type { WeatherTableValue } from '@/components/WeatherTable';
import { WeatherTable } from '@/components/WeatherTable';
import { convertWeatherNotoToTableValue } from '@/components/WeatherTable/WeatherTable.utils';
import { useGetWeatherNoteListQuery } from '@/store';

import styles from './App.module.scss';

const cx = cnBind.bind(styles);
export const App = () => {
  const { data: weatherDate, isLoading } = useGetWeatherNoteListQuery({});

  const [filterWeatherTableValue, setfilterWeatherTableValue] = useState<WeatherTableValue[]>([]);

  const weatherTableValue = useMemo<WeatherTableValue[]>(
    () => convertWeatherNotoToTableValue(weatherDate ?? []),
    [weatherDate],
  );

  return (
    <div className={cx('app')}>
      <div className={cx('app-top')}>
        <h1>Дневник погоды</h1>
        {weatherTableValue.length && (
          <WeatherChart weatherNoteList={filterWeatherTableValue.length ? filterWeatherTableValue : weatherTableValue.slice(0, 7)} />
        )}
      </div>
      <WeatherTable
        value={weatherTableValue}
        onValueChange={setfilterWeatherTableValue}
      />
    </div>
  );
};
