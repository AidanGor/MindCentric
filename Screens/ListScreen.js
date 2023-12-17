import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from "../firebaseConfig";
import { ref, get, child, set } from "firebase/database";

const ListScreen = ({ navigation, route }) => {
  const { listID, setListID } = route.params;
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [numLists, setNumLists] = useState(undefined);
  const userID = "admin"; 

  useEffect(() => {
    
    get(child(ref(db), 'Users/admin'))
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
      const newList = { id: numLists + 1, name: listName, tasks: [] }; 
      setLists([...lists, newList]);
      setNumLists(numLists + 1);
      setListName('');
      updateListDB([...lists, newList], numLists + 1);
    }
  };

  const removeList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setNumLists(numLists - 1);
    updateListDB(updatedLists, numLists - 1);
  };
  

  const editListName = (listId, newName) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list
    );
    setLists(updatedLists);
    updateListDB(updatedLists, numLists);
  };
  

  const updateListDB = (updatedList, numberList) => {
    const userRef = ref(db, `Users/${userID}`);
    const listIndex = updatedList.findIndex((list) => list.id === numberList);

    if (listIndex !== -1) {
      const listRef = child(userRef, `Lists/${listIndex}`);
      set(listRef, updatedList[listIndex]);
    }
  };

  const navigateToTodoList = (list) => {
    navigation.navigate('TodoList', {
      list,

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
      {/* <Text>{numLists}</Text> */}
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
