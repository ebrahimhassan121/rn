import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';

interface Props {
  name: string;
  selected: boolean;
  onPress: () => void;
}
const BottomTab = ({name, onPress, selected}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={name}>
      <Text style={[styles.tabText, selected && styles.selectedTabText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  tabText: {
    fontSize: 18,
    color: colors.gray,
  },
  selectedTabText: {
    color: colors.secondary,
  },
});

export default BottomTab;
