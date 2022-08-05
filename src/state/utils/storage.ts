import {StoreType, StoreValues} from '../interface/store';
import RNFS from 'react-native-fs';
import {defaultValues} from '../default-values';

const path = (storeType: StoreType) =>
  RNFS.DocumentDirectoryPath + '/data-' + storeType + '.txt';

export function saveData(storeType: StoreType, values: StoreValues) {
  RNFS.writeFile(path(storeType), JSON.stringify(values), 'utf8').catch(
    Function,
  );
}

export async function readData(storeType: StoreType): Promise<StoreValues> {
  const data: StoreValues = await RNFS.readFile(path(storeType), 'utf8')
    .then(result => {
      return JSON.parse(result);
    })
    .catch(() => {
      return defaultValues;
    });
  return data;
}
