import type { EChartProps } from '@kbox-labs/react-echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared.js';

export const WEATHER_CHART_CONFIG: EChartProps = {
  style: {
    height: '100%',
    width: '100%',
  },
  tooltip: {
    trigger: 'axis',
  },
  toolbox: {
    show: true,
    feature: {
      magicType: { type: ['bar', 'line'] },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C',
    },
  },
  legend: {
    data: ['Температура'],
  },
};

export const WEATHER_CHART_SERIES_CONFIG = [{
  type: 'line' as const,
  name: 'Температура',
  markLine: {
    symbolSize: 16,
    data: [{ type: 'average' as const }],
    label: {
      position: 'insideMiddleTop' as const,
      padding: 80,
      fontSize: 20,
      formatter: (params: CallbackDataParams) => `Средняя температура  ${params.value} °C`,
    },
    lineStyle: {
      color: 'red',
    },
  },
}];
