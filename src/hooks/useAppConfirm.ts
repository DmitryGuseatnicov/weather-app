import { confirmDialog } from 'primereact/confirmdialog';
import { useCallback } from 'react';

import type { ConfirmDialogProps } from 'primereact/confirmdialog';

export type ApConfirmProps = ConfirmDialogProps & {
  okButtonColor?: 'danger' | 'base';
  cancelButtonColor?: 'danger' | 'base';
};

const defaultProps: ApConfirmProps = {
  message: 'Вы уверены, что хотите продолжить?',
  header: 'Подтверждение',
  acceptLabel: 'Продожить',
  rejectLabel: 'Отмена',
  icon: 'pi pi-info-circle',
};

export const useAppConfirm = (props?: ApConfirmProps) => {
  const handleConfirmDialog = useCallback(
    (actionProps: ApConfirmProps) => {
      const rejectClassName = props?.cancelButtonColor === 'danger' ? 'p-button-danger' : undefined;
      const acceptClassName = props?.okButtonColor === 'danger' ? 'p-button-danger' : undefined;
      confirmDialog({ ...defaultProps, ...props, ...actionProps, rejectClassName, acceptClassName });
    },
    [props],
  );

  return handleConfirmDialog;
};
