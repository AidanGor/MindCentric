import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Home';
import ListScreen from './Screens/ListScreen';
import TodoListScreen from './Screens/TodoListScreen';

const Tab = createBottomTabNavigator();
const ListsStack = createStackNavigator();

const ListsStackScreen = () => ( // Navigation for CRUD++ lists that contain tasks
  <ListsStack.Navigator>
    <ListsStack.Screen name="ListsScreen" component={ListScreen} />
    <ListsStack.Screen name="TodoList" component={TodoListScreen} />
  </ListsStack.Navigator>
);

const Navigator = () => { // Navigation for different tabs in app
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lists" component={ListsStackScreen} />
    </Tab.Navigator>
  );
};

export default Navigator;