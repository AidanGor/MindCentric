// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH3PekQg1YNVR3Mr-1F6YSoE9bOtRUi2w",
  authDomain: "mind-centric.firebaseapp.com",
  databaseURL: "https://mind-centric-default-rtdb.firebaseio.com",
  projectId: "mind-centric",
  storageBucket: "mind-centric.appspot.com",
  messagingSenderId: "243143975352",
  appId: "1:243143975352:web:60dbf445593e6ca4896f4d",
  measurementId: "G-CKWS280M7G"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getDatabase(app);