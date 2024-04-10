import cnBind from 'classnames/bind';
import { InputNumber } from 'primereact/inputnumber';

import styles from './UIInputNumber.module.scss';

import type { UIInputNumberProps } from './UIInputNumber.types';

const cx = cnBind.bind(styles);

export const UIInputNumber: React.FC<UIInputNumberProps> = ({ label, error, ...props }) => {
  return (
    <div className={cx('ui-input-number')} data-cy-input-number>
      <span className={cx('label')}>{label}</span>
      <InputNumber {...props} invalid={Boolean(error)} />
      {error && <span data-cy-error-label className={cx('error')}>{error}</span>}
    </div>
  );
};
