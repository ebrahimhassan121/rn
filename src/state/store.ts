import {useContext} from 'react';
import {StoreType} from './interface/store';
import mobxStore from './mobx-store';
import {StoreContext} from './hooks-store';

export const useStore = (storeType: StoreType = 'mobx') => {
  const hooksStore = useContext(StoreContext);

  return storeType === 'hooks' ? hooksStore : mobxStore;
};
