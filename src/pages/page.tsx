import React, {useEffect} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInput from '../components/text-input';
import {useStore} from '../state/store';
import {readData} from '../state/utils/storage';
import {colors} from '../theme/colors';
import {rems} from '../theme/rems';

interface Props {
  screenType: 'hooks' | 'mobx';
}
const Page = ({screenType = 'mobx'}: Props) => {
  const {values, setValue, setValues, save, reset} = useStore(screenType);

  useEffect(() => {
    readData(screenType).then(data => {
      setValues(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtons = () => (
    <View
      style={[
        styles.itemContainer,
        styles.inlineItemContainer,
        styles.buttonsContainer,
      ]}>
      {['imperial', 'metric'].map(title => (
        <TouchableOpacity
          key={`button-${title}`}
          onPress={() => setValue('type', title)}
          style={[
            styles.button,
            title === values.type && styles.selectedButton,
          ]}>
          <Text>{title.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderImperialMetric = () =>
    values.type === 'metric' ? (
      <View style={styles.itemContainer}>
        <TextInput label="m" screenType={screenType} />
      </View>
    ) : (
      <View style={[styles.itemContainer, styles.inlineItemContainer]}>
        <TextInput
          containerStyle={styles.smallTextInputContainer}
          label="ft"
          screenType={screenType}
        />
        <TextInput
          containerStyle={styles.smallTextInputContainer}
          label="in"
          screenType={screenType}
        />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`Unit converter (with ${screenType})`}</Text>
      <TextInput label="kg" screenType={screenType} />
      {renderImperialMetric()}
      {renderButtons()}
      <View style={[styles.itemContainer]}>
        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text>{'Save to disk'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Reset" onPress={reset} />
    </ScrollView>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: rems.x4,
  },
  title: {color: 'white', fontSize: 16},
  itemContainer: {marginTop: rems.x2, width: '100%', alignItems: 'center'},
  inlineItemContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  buttonsContainer: {overflow: 'hidden', borderRadius: rems.x4},
  button: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: rems.x2,
  },
  selectedButton: {backgroundColor: colors.main},
  smallTextInputContainer: {flex: 0.48},
  saveButton: {
    width: '50%',
    backgroundColor: colors.main,
    alignItems: 'center',
    padding: rems.x2,
    borderRadius: rems.x4,
  },
});
