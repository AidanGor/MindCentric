import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { ref, onValue, off, set} from 'firebase/database';
import { db } from '../firebaseConfig';

const TodoListScreen = ({ route }) => {
  const { list } = route.params;
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const listRef = ref(db, `Users/admin/Lists/${list.id-1}/tasks`);

    const fetchData = (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        setTasks(tasksData);
      }
    };

    onValue(listRef, fetchData);

    return () => {
      off(listRef, 'value', fetchData);
    };
  }, [list.id]);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = { id: Date.now().toString(), text: task };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask('');
      updateTaskDB([...tasks, newTask], list.id);
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    updateTaskDB(updatedTasks, list.id);
  };

  const editTask = (taskId, newText) => {
    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, text: newText } : t));
    setTasks(updatedTasks);
    updateTaskDB(updatedTasks, list.id);
  };

  const updateTaskDB = (updatedTasks, listId) => {
    set(ref(db, `Users/admin/Lists/${listId-1}/tasks`), updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{list.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.editableText} numberOfLines={null}>
              {item.text}
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Remove" onPress={() => removeTask(item.id)} />
              <Button
                title="Edit"
                onPress={() => {
                  Alert.prompt('Enter new name:', item.text, (newText) => {
                    if (newText !== null && newText !== item.text) {
                      editTask(item.id, newText);
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
  taskTitle: {
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    textAlign: 'center',
    minWidth: '80%',
  },
  
  editableText: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default TodoListScreen;
