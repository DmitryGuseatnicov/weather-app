import { Provider } from 'react-redux';

import { store } from '@/store';

import type { FC, ReactNode } from 'react';

export const StoreProvider:FC< { children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
