import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useCallback, useMemo } from 'react';

import { useGetUsersQuery, useGetWeatherTypeListQuery } from '@/store';

import { CreateWeatherModal } from '../CreateWeatherModal';

import {
  COLUMN_ICON_STYLES,
  WEATHER_TABLE_COLUMNS,
  WEATHER_TABLE_SCROLLER_OPTIONS,
  WEATHER_TABLE_STYLE,
} from './WeatherTable.constants';
import { useFilterWeatherNoteLogic, useTableItemsLogic } from './WeatherTable.hook';
import { filterColumnTemplate, weatherColumnTemplate } from './WeatherTable.utils';
import { WeatherTableHeader } from './WeatherTableHeader';

import type { WeatherTableProps, WeatherTableValue } from './WeatherTable.types';
import type { BaseSelectOption } from '../UI/shared.types';

export const WeatherTable: React.FC<WeatherTableProps> = ({ value, onValueChange }) => {
  const { data: users } = useGetUsersQuery({});
  const { data: weatherTypes } = useGetWeatherTypeListQuery({});

  const { filters, onResetFilter, onFilterColumnsChange, isAddedFilters } = useFilterWeatherNoteLogic();
  const {
    selectedItem,
    formData,
    openModal,
    isModalOpen,
    onCloseModal,
    setSelectedItems,
    onDeleteButtonClick,
    onEditButtonCLick,
    onSelectionChange,
  } = useTableItemsLogic();

  const handleDataTableValueChange = useCallback((event: WeatherTableValue[]) => {
      if (isAddedFilters) {
        onValueChange?.(event);
      } else {
        onValueChange?.([]);
      }
  }, [isAddedFilters, onValueChange]);

  const userList = useMemo<BaseSelectOption[]>(() => {
    return users?.map((item) => ({ id: item.id, label: `${item?.name} ${item?.surname}` })) ?? [];
  }, [users]);

  const header = useMemo(() => {
    const props = {
      selection: selectedItem,
      onAddButtonClick: openModal,
      onResetFiltersClick: onResetFilter,
      onSelectionChange: () => setSelectedItems([]),
    };

    return <WeatherTableHeader {...props} />;
  }, [onResetFilter, openModal, selectedItem, setSelectedItems]);

  return (
    <div>
      <DataTable
        tableStyle={WEATHER_TABLE_STYLE}
        virtualScrollerOptions={WEATHER_TABLE_SCROLLER_OPTIONS}
        selectionMode="checkbox"
        scrollHeight="400px"
        emptyMessage="Совпадений не найдено"
        value={value}
        selection={selectedItem}
        filters={filters}
        showGridlines
        size="small"
        scrollable
        header={header}
        onSelectionChange={onSelectionChange}
        onFilter={onFilterColumnsChange}
        onValueChange={handleDataTableValueChange}
      >
        <Column style={COLUMN_ICON_STYLES} selectionMode="multiple" showFilterMenu={false} frozen />
        {WEATHER_TABLE_COLUMNS.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            frozen={column.frozen}
            body={column.isCustom && weatherColumnTemplate()}
            selectionMode={column.selectionMode}
            style={column.style}
            filter={column.filter}
            showFilterMatchModes={false}
            filterField={column.field}
            showFilterMenu={column.showFilterMenu}
            filterElement={filterColumnTemplate({ userList })}
          />
        ))}
        <Column style={COLUMN_ICON_STYLES} body={weatherColumnTemplate(onEditButtonCLick)} field="edit" />
        <Column style={COLUMN_ICON_STYLES} body={weatherColumnTemplate(onDeleteButtonClick)} field="delete" />
      </DataTable>
      <CreateWeatherModal
        visible={isModalOpen}
        formData={formData}
        onHide={onCloseModal}
        userOptions={userList}
        weatherTypeOptions={weatherTypes}
      />
    </div>
  );
};
