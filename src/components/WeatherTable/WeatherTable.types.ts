import type { Temperature, WeatherNote } from '@/store';

import type { ColumnProps } from 'primereact/column';
import type { DataTablePropsMultiple } from 'primereact/datatable';

export type WeatherTableColumnFiled = keyof Omit<WeatherNote, 'id'> | 'delete' | 'edit';

export interface WeatherTableColumnItem extends Omit<ColumnProps, 'field'> {
  field?: WeatherTableColumnFiled;
  isCustom?: boolean;
}

export interface WeatherTableValue extends Omit<WeatherNote, 'temperature' | 'user'> {
  temperature: Temperature;
  user?: { id: number; label: string };
}

export interface WeatherTableProps
  extends Omit<DataTablePropsMultiple<WeatherTableValue[]>, 'selectionMode' | 'selection'> {}
