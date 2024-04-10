import dayjs from 'dayjs';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { useCallback, useMemo, useState } from 'react';

import { useToastContext } from '@/context';
import { useAppConfirm, useBooleanState } from '@/hooks';
import { useDeleteWeatherNoteListMutation } from '@/store';
import { toastMessageCreator } from '@/utils';

import { DELETE_HEATHER_NOTES_ERROR, DELETE_HEATHER_NOTES_SUCCESS } from './WeatherTable.constants';

import type { WeatherTableValue } from './WeatherTable.types';
import type { DataTableSelectionMultipleChangeEvent, DataTableStateEvent } from 'primereact/datatable';

export const useDeleteWeatherNoteLogic = () => {
  const [deleteProducts] = useDeleteWeatherNoteListMutation();

  const showToast = useToastContext();
  const onConfirm = useAppConfirm({ okButtonColor: 'danger' });

  const handleAccept = async (selection?: WeatherTableValue[], onSuccess?: (ids: number[]) => void) => {
    try {
      await deleteProducts({ ids: selection?.map((item) => item.id) ?? [] });
      showToast(toastMessageCreator.success(DELETE_HEATHER_NOTES_SUCCESS));
      onSuccess?.(selection?.map((item) => item.id) ?? []);
    } catch (error) {
      showToast(toastMessageCreator.error(DELETE_HEATHER_NOTES_ERROR));
    }
  };

  const onDeleteWeatherNoteLost = (selection?: WeatherTableValue[], onSuccess?: (ids: number[]) => void) => {
    onConfirm({
      accept: () => handleAccept(selection, onSuccess),
    });
  };

  return onDeleteWeatherNoteLost;
};

FilterService.register('custom_date', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) {
    return true;
  }

  const itemDate = dayjs(value);
  const dateFrom = dayjs(from);
  const dateTo = dayjs(to);

  return dateFrom <= itemDate && itemDate <= dateTo;
});

const DEFAULT_FILTERS = {
  user: { value: null, matchMode: FilterMatchMode.IN },
  date: { value: null, matchMode: FilterMatchMode.CUSTOM },
};

export const useFilterWeatherNoteLogic = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const isAddedFilters = useMemo(
    () => Object.values(filters).reduce((prev, next) => (next.value ? true : prev), false), [filters],
  );

  const onResetFilter = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const onFilterColumnsChange = useCallback((event: DataTableStateEvent) => {
    setFilters(event.filters as typeof DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    onResetFilter,
    onFilterColumnsChange,
    isAddedFilters,
  };
};

export const useTableItemsLogic = () => {
  const [selectedItem, setSelectedItems] = useState<WeatherTableValue[]>([]);

  const [isModalOpen, openModal, closeModal] = useBooleanState();
  const [formData, setFormData] = useState<Partial<WeatherTableValue>>({});

  const onCloseModal = useCallback(() => {
    closeModal();
    setFormData({});
  }, [closeModal]);

  const onSelectionChange = useCallback((event: DataTableSelectionMultipleChangeEvent<WeatherTableValue[]>) => {
    setSelectedItems(event.value);
  }, []);

  const onEditButtonCLick = useCallback(
    (data: WeatherTableValue) => {
      setFormData(data);
      openModal();
    },
    [openModal],
  );

  const handleDeleteWeatherNote = useDeleteWeatherNoteLogic();

  const onDeleteButtonClick = useCallback(
    (data: WeatherTableValue) => {
      handleDeleteWeatherNote([data], (ids) => setSelectedItems(selectedItem.filter((item) => !ids.includes(item.id))));
    },
    [handleDeleteWeatherNote, selectedItem],
  );

  return {
    selectedItem,
    setSelectedItems,
    formData,
    isModalOpen,
    openModal,
    onCloseModal,
    onEditButtonCLick,
    onDeleteButtonClick,
    onSelectionChange,
  };
};
