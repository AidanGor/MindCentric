import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

const TodoListScreen = ({ route }) => {
  // Inside ListScreen component
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '80%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  editableText: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
  },
});

export default TodoListScreen;
