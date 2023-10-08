import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/Home';
import ListScreen from './Screens/ListScreen';
import TodoListScreen from './Screens/TodoListScreen';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lists" component={ListScreen} />
      <Tab.Screen name="TodoList" component={TodoListScreen} />
    </Tab.Navigator>
  );
};

export default Navigator;
