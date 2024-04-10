import cnBind from 'classnames/bind';
import { Button } from 'primereact/button';
import { useCallback } from 'react';

import { useDeleteWeatherNoteLogic } from '../WeatherTable.hook';

import styles from './WeatherTableHeader.module.scss';

import type { WeatherTableHeaderProps } from './WeatherTableHeader.types';

const cx = cnBind.bind(styles);

export const WeatherTableHeader: React.FC<WeatherTableHeaderProps> = ({
  selection = [],
  onAddButtonClick,
  onResetFiltersClick,
  onSelectionChange,
}) => {
  const handleDelete = useDeleteWeatherNoteLogic();

  const handleDeleteAllButtonClick = useCallback(() => {
    handleDelete(selection, () => onSelectionChange?.([]));
  }, [handleDelete, onSelectionChange, selection]);

  return (
    <div className={cx('weather-table-header')}>
      <div className={cx('filters')}>
        <div>{`Выбрано: ${selection.length}`}</div>
      </div>

      <div className={cx('actions')}>
        {Number(selection?.length) > 0 && (
          <Button size="small" severity="danger" onClick={handleDeleteAllButtonClick}>
            Удалить выбранные
          </Button>
        )}
        <Button size="small" onClick={onResetFiltersClick}>
          Сбросить фильтры
        </Button>
        <Button size="small" onClick={onAddButtonClick}>
          Добавить запись
        </Button>
      </div>
    </div>
  );
};
