import React, { useState, useEffect } from 'react';
import { Modal, Text, View, FlatList, Alert, StyleSheet } from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import i18n from '../i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    margin: 30,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  }
});

const ContactsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      await Permissions.askAsync(Permissions.CONTACTS);
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
  }, [search]);

  return (
    <View style={styles.container}>
      <Button
        title={i18n.t('chooseContact')}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal
        visible={visible}
        transparent={true}
      >
        <View style={styles.modal}>
          <SearchBar
            placeholder={i18n.t('typeHere')}
            onChangeText={setSearch}
            value={search}
            platform="android"
          />
          <FlatList
            data={contacts}
            keyExtractor={(contact) => contact.id}
            renderItem={(row) => {
              return (
                <Text>{row.item.name}</Text>
              );
            }}
          />
          <Button
            title={i18n.t('cancel')}
            onPress={() => setVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
export default ContactsScreen;
