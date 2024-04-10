import { EChart } from '@kbox-labs/react-echarts';
import cnBind from 'classnames/bind';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import { useMemo, type FC } from 'react';

import { WEATHER_CHART_CONFIG, WEATHER_CHART_SERIES_CONFIG } from './WeatherChart.constants';
import styles from './WeatherChart.module.scss';

import type { WeatherChartProps } from './WeatherChart.types';
import type { WeatherTableValue } from '../WeatherTable';

const cx = cnBind.bind(styles);

const getMiddleTemperatureOfWetherNoteList = (data: WeatherTableValue[]) => {
  return data.reduce((prev, next) => prev + Number(next.temperature.value) || 0, 0) / data.length;
};

export const WeatherChart: FC<WeatherChartProps> = ({ weatherNoteList }) => {
  const weatherListGroopedByData = useMemo(() => groupBy(
    weatherNoteList, (item) => dayjs(item.date).format('DD-MM-YYYY')), [weatherNoteList],
  );

  const weatherSeries = useMemo(
    () => Object.entries(weatherListGroopedByData)
      .map(([date, wetherNote]) => [date, getMiddleTemperatureOfWetherNoteList(wetherNote)]),
      [weatherListGroopedByData],
);

const series = useMemo(() => [
  {
    data: weatherSeries.reverse(),
    ...WEATHER_CHART_SERIES_CONFIG[0],
  },
], [weatherSeries]);

  return (
    <div className={cx('weather-chart')}>
      <EChart
        style={WEATHER_CHART_CONFIG.style}
        tooltip={WEATHER_CHART_CONFIG.tooltip}
        toolbox={WEATHER_CHART_CONFIG.toolbox}
        xAxis={WEATHER_CHART_CONFIG.xAxis}
        yAxis={WEATHER_CHART_CONFIG.yAxis}
        series={series}
      />
    </div>
  );
};
