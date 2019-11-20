import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Text, View, FlatList, Alert, StyleSheet, Image } from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import i18n from '../i18n';

import ContactModal from './ContactModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ContactsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const askPermissions = async () => {
      const { status } = await Permissions.askAsync(
        Permissions.CONTACTS,
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status === 'granted') {
        setPermissionsGranted(true);
      }
    };
    askPermissions();
  });

  useEffect(() => {
    if (!permissionsGranted) {
      return;
    }
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Name,
          Contacts.Fields.ID,
        ],
      });
      if (search !== '') {
        setContacts(data.filter(
          (contact) => contact.name.startsWith(search))
        );
      } else {
        setContacts(data);
      }
    };
    loadContacts();
  }, [search, permissionsGranted]);

  async function createPhoto() {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const path = `${FileSystem.documentDirectory}${selectedContact.id}.jpg`;
      await FileSystem.copyAsync({
        from: result.uri,
        to: path,
      });
      setImage(path);
    }
  }

  console.log(image);

  return (
    <View style={styles.container}>
      <Button
        title={i18n.t('chooseContact')}
        onPress={() => {
          setVisible(true);
        }}
      />
      <ContactModal
        contacts={contacts}
        search={search}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSearch={setSearch}
        onSelect={(contact) => {
          setSelectedContact(contact);
          setVisible(false);
        }}
      />
      {selectedContact && (
        <>
          <Text>
            {selectedContact.name}
          </Text>
          <Button
            title="Create a photo"
            onPress={createPhoto}
          />
          {image && (
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          )}
        </>
      )}
    </View>
  );
}
export default ContactsScreen;
