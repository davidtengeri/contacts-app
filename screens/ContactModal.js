import React, { useState, useEffect } from 'react';
import {
  FlatList, Modal, StyleSheet, TouchableHighlight, View, Text
} from 'react-native';
import { Button, ListItem, SearchBar } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

import i18n from '../i18n';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 30,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  }
});

const ContactModal = ({ visible, contacts, search, onSearch, onCancel, onSelect }) => {


  return (
    <Modal
      visible={visible}
      transparent={true}
    >
      <View style={styles.modal}>
        <SearchBar
          placeholder={i18n.t('typeHere')}
          onChangeText={onSearch}
          value={search}
          platform="android"
        />
        <FlatList
          data={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={(row) => {
            return (
              <TouchableHighlight
                onPress={() => { onSelect(row.item) }}
              >
                <ListItem
                  title={row.item.name}
                  subtitle={row.item.phoneNumbers ? row.item.phoneNumbers.map((phoneNumber) => phoneNumber.number).join(', ') : ''}
                />
              </TouchableHighlight>

            );
          }}
        />
        <Button
          title={i18n.t('cancel')}
          onPress={onCancel}
        />
      </View>
    </Modal>
  );
};

export default ContactModal;
