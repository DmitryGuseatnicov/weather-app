import cnBind from 'classnames/bind';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';

import styles from './UIInputTextarea.module.scss';

import type { UIInputTextareaProps } from './UIInputTextarea.types';

const cx = cnBind.bind(styles);

export const UIInputTextarea: React.FC<UIInputTextareaProps> = ({ label, error, ...props }) => {
  return (
    <div className={cx('ui-input-textarea')}>
      <span className={cx('label')}>{label}</span>
      <InputTextarea invalid={Boolean(error)} className={cx('textarea')} {...props} />
      <span className={cx('error')}>{error}</span>
    </div>
  );
};
