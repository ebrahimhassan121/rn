export type StoreType = 'mobx' | 'hooks';

export interface StoreValues {
  kg: string;
  m: string;
  ft: string;
  in: string;
  type: 'imperial' | 'metric';
}

export interface Store {
  values: StoreValues;
  setValues: (values: StoreValues) => void;
  setValue: (key: keyof StoreValues, value: any) => void;
  reset: () => void;
  save: () => void;
}
