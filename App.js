import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ContactsScreen from './screens/ContactsScreen';

const AppNavigator = createStackNavigator({
  Contacts: ContactsScreen,
});

export default createAppContainer(AppNavigator);
