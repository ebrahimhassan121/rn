import React from 'react';
import {createContext, useState} from 'react';
import {Store} from './interface/store';
import {saveData} from './utils/storage';
import {defaultValues} from './default-values';

export const StoreContext = createContext<Store>({
  values: defaultValues,
  setValues: () => {},
  setValue: () => {},
  reset: () => {},
  save: () => {},
});

export const HooksContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [values, setValues] = useState<Store['values']>(defaultValues);

  const handleSet = (key: keyof Store['values'], value: typeof key) => {
    setValues(prevValues => {
      return {...prevValues, [key]: value};
    });
  };

  const handleReset = () => setValues(defaultValues);
  const handleSave = () => saveData('hooks', values);

  return (
    <StoreContext.Provider
      value={{
        values,
        setValues,
        setValue: handleSet,
        reset: handleReset,
        save: handleSave,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
