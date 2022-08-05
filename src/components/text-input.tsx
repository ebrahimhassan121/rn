import {observer} from 'mobx-react';
import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {StoreValues} from '../state/interface/store';
import {useStore} from '../state/store';
import {colors} from '../theme/colors';
import {rems} from '../theme/rems';

interface Props extends TextInputProps {
  label: keyof StoreValues;
  containerStyle?: ViewStyle;
  screenType: 'hooks' | 'mobx';
}

function TextInput(props: Props) {
  const {values, setValue} = useStore(props.screenType);
  const value = values[props.label];

  return (
    <View style={[styles.container, props.containerStyle]} key={props.label}>
      <RNTextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={value}
        onChangeText={text => setValue(props.label, text)}
        {...props}
      />
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
}

export default observer(TextInput);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: colors.white,
    flexGrow: 1,
    borderRadius: rems.x4,
    marginTop: rems.x1,
    padding: rems.x1,
    paddingVertical: rems.x2,
    color: colors.white,
    maxWidth: '90%',
  },
  label: {
    color: colors.white,
    marginLeft: rems.x2,
    fontSize: 14,
  },
});
