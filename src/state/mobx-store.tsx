import {makeAutoObservable} from 'mobx';
import {Store, StoreValues} from './interface/store';
import {defaultValues} from './default-values';
import {saveData} from './utils/storage';

class MobxStore {
  values = defaultValues;
  constructor() {
    makeAutoObservable(this);
  }

  setValue = (key: keyof Store['values'], value: any) => {
    this.values[key] = value;
  };

  setValues = (values: StoreValues) => {
    this.values = values;
  };

  reset = () => {
    this.values = defaultValues;
  };

  save = () => {
    saveData('mobx', this.values);
  };
}
export default new MobxStore();
