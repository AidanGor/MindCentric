import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {db} from "../firebaseConfig"
import { ref, set, get, child, update } from "firebase/database";

const ListScreen = ({ navigation }) => {
  const [listName, setListName] = useState(''); // Hook for creating a list before storing it 
  const [lists, setLists] = useState([]); // Hook for storing lists in an array of objects
  const [numLists, setNumLists] = useState(undefined);
  const [test, setTest] = useState(0);

  useEffect(() => {
    // update(ref(db, `userInfo/` + userID), {genres: ["placeholder"]});
    get(child(ref(db), `Users/User001}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const info = snapshot.val();
                // setTest(1);
                setNumLists(info.numLists)
                setTest(info.numLists)
            } else {
                // console.log("Error with firebase");
            }
        })
        .catch((error) => {
            console.log(error);
        });
  }, []);

  useEffect(()=>{
    
    // setTest(1)
   
  },[numLists])

  const addList = () => { // CREATE: Adds a new list
    if (listName.trim() !== '') {
      const newList = { id: Date.now().toString(), name: listName, tasks: [] };
      setLists([...lists, newList]);
      setListName('');
      // updateListDB();
      navigateToTodoList(newList);
      
    }
  };

  const removeList = (listId) => { // DELETE: Removes a specific list based on listID from input
    setLists(lists.filter((list) => list.id !== listId));
  };

  const editListName = (listId, newName) => { // UPDATE: Edits name of list through mapping all lists but renaming the list that matches with the inputted listID
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, name: newName } : list))
    );
  };

  const navigateToTodoList = (list) => { // Navigates to specific task view of list based on pressed list
    navigation.navigate('TodoList', {
      list,
      updateList: (updatedList) => updateList(list.id, updatedList),
    });
  };

  const updateList = (listId, updatedList) => { // Renders all tasks from a specific list based on listID
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? updatedList : list))
    );
  };

  const updateListDB = () => {
    set(ref(db, 'Users/User001/'), {
      Lists: lists
    });
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter List Name"
        value={listName}
        onChangeText={(text) => setListName(text)}
      />
      <Button title="Add List" onPress={addList} />
      <Text>{`${test}`}</Text>
      {/* READ: displays list name and options to view associated tasks and update or remove list */}
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
