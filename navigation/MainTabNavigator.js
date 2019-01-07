import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DragScreen from '../screens/DragScreen';

const _tabBarOnPress = (tab, jumpToIndex) => {  
  console.log("Tab clicked: " + JSON.stringify(tab));
  console.log("Tab clicked: " + jumpToIndex);
  if (tab.index === 0) { // inside 1st screen of StackNavigator
    const stackNavigation = tab.routes[0]; // same as 'this.props.navigation.state' inside component
    if (!!stackNavigation && !!stackNavigation.params && !!stackNavigation.params.scrollToTop) {
      stackNavigation.params.scrollToTop();
    }
  }  
  //jumpToIndex(tab.index);
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Rooms',
  //tabBarOnPress: _tabBarOnPress,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Reports',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: DragScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
