import type { WeatherTableValue } from '../WeatherTable.types';

export interface WeatherTableHeaderProps {
  selection?: WeatherTableValue[];
  onAddButtonClick: () => void;
  onResetFiltersClick: () => void;
  onSelectionChange?: (selection?: WeatherTableValue[]) => void;
}
