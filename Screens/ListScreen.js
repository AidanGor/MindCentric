import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from "../firebaseConfig";
import { ref, get, child, set } from "firebase/database";

const ListScreen = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [numLists, setNumLists] = useState(undefined);
  const userID = "admin"; 

  useEffect(() => {
    const userRef = child(ref(db), `Users/${userID}`);
    
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const info = snapshot.val();
          setNumLists(info.numLists);
          setLists(info.Lists || []); 
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addList = () => {
    if (listName.trim() !== '') {
      const newList = { id: Date.now().toString(), name: listName, tasks: [] };
      setLists((prevLists) => [...prevLists, newList]);
      setListName('');
  
  
      setLists((prevLists) => {
        const updatedLists = [...prevLists, newList];
        updateListDB(updatedLists);
        return updatedLists;
      });
    }
  };

  const removeList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    updateListDB(lists.filter((list) => list.id !== listId));
  };

  const editListName = (listId, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, name: newName } : list))
    );
    updateListDB(lists.map((list) => (list.id === listId ? { ...list, name: newName } : list)));
  };

  const updateListDB = (updatedLists) => {
    set(ref(db, `Users/${userID}`), {
      numLists: updatedLists.length,
      Lists: updatedLists,
    });
  };

  const updateList = (listId, updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? updatedList : list))
    );
  };

  const navigateToTodoList = (list) => {
    navigation.navigate('TodoList', {
      list,
      updateList: (updatedList) => updateList(list.id, updatedList),
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter List Name"
        value={listName}
        onChangeText={(text) => setListName(text)}
      />
      <Button title="Add List" onPress={addList} />

      <FlatList 
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => navigateToTodoList(item)}>
              <Text style={styles.editableText}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Button title="Remove" onPress={() => removeList(item.id)} />
              <Button
                title="Edit"
                onPress={() => {
                  Alert.prompt('Enter new name:', item.name, (newName) => {
                    if (newName !== null && newName !== item.name) {
                      editListName(item.id, newName);
                    }
                  });
                }}
              />
            </View>
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
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default ListScreen;
