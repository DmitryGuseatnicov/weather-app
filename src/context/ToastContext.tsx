import { Toast } from 'primereact/toast';
import { createContext, useCallback, useContext, useRef } from 'react';

import type { ToastMessage } from 'primereact/toast';
import type { ReactNode } from 'react';

const ToastContext = createContext<((options: ToastMessage | ToastMessage[]) => void) | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = useCallback((options: ToastMessage | ToastMessage[]) => {
    if (!toastRef.current) {
      return;
    }
    toastRef.current?.show?.(options);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <Toast ref={toastRef} />
      <div>{children}</div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    return;
  }

  return context;
};
