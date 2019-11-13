import React, { useState, useEffect } from 'react';
import { Modal, Text, View, FlatList, Alert, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import * as Contacts from 'expo-contacts';
import i18n from '../i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ContactsScreen = () => {
  return (
    <View style={styles.container}>

    </View>
  );
}
export default ContactsScreen;
