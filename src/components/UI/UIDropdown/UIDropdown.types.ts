import type { DropdownProps } from 'primereact/dropdown';

export interface UIDropdownProps extends Omit<DropdownProps, 'filter'> {
  withFilter?: boolean | 'auto';
  withVirtualScroller?: boolean | 'auto';
  withLazyLoading?: boolean;
  label?: string;
  error?: string;
}
