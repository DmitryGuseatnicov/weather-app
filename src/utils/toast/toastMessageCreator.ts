import type { ToastMessage } from 'primereact/toast';

export const toastMessageCreator = {
  success: (message: string, toastParams?: ToastMessage): ToastMessage => ({
    severity: 'success',
    summary: toastParams?.summary || 'Успешно',
    detail: message,
    life: toastParams?.life || 3000,
  }),

  error: (message: string, toastParams?: ToastMessage): ToastMessage => ({
    severity: 'error',
    summary: toastParams?.summary || 'Ошибка',
    detail: message,
    life: toastParams?.life || 3000,
  }),
};
