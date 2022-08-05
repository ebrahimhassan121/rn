/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Page from './src/pages/page';
import {HooksContextProvider} from './src/state/hooks-store';
import {colors} from './src/theme/colors';

const tabs = ['HOOKS', 'MOBX'];

const renderScene = SceneMap({
  HOOKS: () => (
    <HooksContextProvider>
      <Page screenType="hooks" />
    </HooksContextProvider>
  ),
  MOBX: observer(Page),
});

const App = () => {
  const [activeRoute, setActiveRoute] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TabView
        renderScene={renderScene}
        navigationState={{
          index: activeRoute,
          routes: tabs.map(tab => ({key: tab, title: tab})),
        }}
        onIndexChange={setActiveRoute}
        tabBarPosition="bottom"
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            style={styles.tabBarStyle}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  tabBarStyle: {backgroundColor: colors.main},
  indicatorStyle: {backgroundColor: colors.white},
});

export default App;
