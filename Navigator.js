import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Home';
import ListScreen from './Screens/ListScreen';
import TodoListScreen from './Screens/TodoListScreen';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Tab = createBottomTabNavigator();
const ListsStack = createStackNavigator();
const auth = getAuth();

const ListsStackScreen = ({user}) => { // Navigation for CRUD++ lists that contain tasks
  return(
    <ListsStack.Navigator>
      <ListsStack.Screen 
        name="ListsScreen" 
        component={ListScreen} 
        initialParams={{user: user}}
      />
      <ListsStack.Screen 
        name="TodoList" 
        component={TodoListScreen}
        initialParams={{user: user}}
      />
    </ListsStack.Navigator>
  )
  };

const Tabs = ({user}) => { // Navigation for different tabs in app
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsStackScreen}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  )
};

const LoginView = ({loggedIn, setLoggedIn, user, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user)
      setLoggedIn(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Login</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

const Navigator = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <View style={{flex: 1}}>
      {loggedIn ? <Tabs user={user}/> : <LoginView loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/> }
    </View>
  )
}

export default Navigator;