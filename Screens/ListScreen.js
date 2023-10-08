import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

const ListScreen = ({ navigation }) => {
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
  
    const addList = () => {
      if (listName.trim() !== '') {
        setLists([...lists, { id: Date.now().toString(), name: listName }]);
        setListName('');
      }
    };
  
    const removeList = (listId) => {
      setLists(lists.filter((list) => list.id !== listId));
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter list name"
          value={listName}
          onChangeText={(text) => setListName(text)}
        />
        <Button title="Add List" onPress={addList} />
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TextInput
                style={styles.editableText}
                value={item.name}
                onChangeText={(text) => {
                  setLists((prevLists) =>
                    prevLists.map((list) => (list.id === item.id ? { ...list, name: text } : list))
                  );
                }}
              />
              <Button title="Remove" onPress={() => removeList(item.id)} />
            </View>
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '80%',
  },
});

export default ListScreen;
