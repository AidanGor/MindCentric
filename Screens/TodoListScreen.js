import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TodoListScreen = ({ route }) => {
  const { list, updateList } = route.params; // Used in order to render tasks from pressed list
  const [task, setTask] = useState(''); // Hook for creating a task before storing it
  const [tasks, setTasks] = useState(list.tasks || []); // Hook for storage of tasks through an array of objects

  const memoizedUpdateList = useCallback(
    (updatedList) => {
      updateList(updatedList);
    },
    [updateList]
  );

  useEffect(() => {
    memoizedUpdateList({ ...list, tasks });
  }, [list, tasks, memoizedUpdateList]);

  const addTask = () => { // CREATE: Adds a new task
    if (task.trim() !== '') {
      const newTask = { id: Date.now().toString(), text: task };
      setTasks([...tasks, newTask]);
      setTask('');
      updateList({ ...list, tasks: [...tasks, newTask] });
    }
  };

  const removeTask = (taskId) => { // DELETE: Removes a specific task based on taskID from input
    setTasks(tasks.filter((t) => t.id !== taskId));
    updateList({ ...list, tasks: tasks.filter((t) => t.id !== taskId) });
  };

  const editTask = (taskId, newText) => { // UPDATE: Edits name of task through mapping all tasks but renaming the task that matches with the inputted taskID
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task))
    );
    updateList({ ...list, tasks: tasks.map((t) => (t.id === taskId ? { ...t, text: newText } : t)) });
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
      {/* READ: displays task name and options to update or remove task */}
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
    // justifyContent: 'space-between',
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
