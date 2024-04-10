import cnBind from 'classnames/bind';
import { Dropdown } from 'primereact/dropdown';

import styles from './UIDropdown.module.scss';

import type { UIDropdownProps } from './UIDropdown.types';

const cx = cnBind.bind(styles);

const baseScrollItemSize = 38;

const getIsFilter = (withFilter: UIDropdownProps['withFilter'], options: UIDropdownProps['options']) => {
  if (!options?.length) {
    return;
  }

  if (withFilter === 'auto') {
    return options.length > 20;
  }

  return withFilter;
};

type T = {
  withVirtualScroller?: UIDropdownProps['withFilter'];
  options?: UIDropdownProps['options'];
  config?: UIDropdownProps['virtualScrollerOptions'];
};

const getVirtualScrollOption = ({ withVirtualScroller, options, config }: T) => {
  if (!options?.length || !withVirtualScroller) {
    return;
  }

  if (withVirtualScroller === 'auto') {
    return { itemSize: baseScrollItemSize, ...config };
  }

  return config;
};

export const UIDropdown: React.FC<UIDropdownProps> = ({
  withFilter = 'auto',
  withVirtualScroller = 'auto',
  label,
  error,
  ...props
}) => {
  const filter = getIsFilter(withFilter, props.options);

  const virtualScrollerOptions = getVirtualScrollOption({
    withVirtualScroller,
    options: props.options,
  });

  return (
    <div className={cx('ui-dropdown')} data-cy-ui-dropdown>
      {label && <span className={cx('label')}>{label}</span>}
      <Dropdown
        {...props}
        filter={filter}
        invalid={Boolean(error)}
        virtualScrollerOptions={virtualScrollerOptions}
        emptyFilterMessage="Не найднено"
      />
      {label && <span className={cx('error')}>{error}</span>}
    </div>
  );
};
