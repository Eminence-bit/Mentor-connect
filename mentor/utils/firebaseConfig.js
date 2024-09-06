import { initializeApp } from 'firebase/app';
//import { initializeAuth} from 'firebase/auth';
import {
  initializeAuth,
  browserSessionPersistence,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { Platform } from "react-native";
//@ts-ignore
//import { getReactNativePersistence } from '@firebase/auth/';

const firebaseConfig = {
  apiKey: "AIzaSyDv6utLv4RjyVafH_WzL4tQBXFuQr7lsbo",
  authDomain: "mentee-connect.firebaseapp.com",
  projectId: "mentee-connect",
  storageBucket: "mentee-connect.appspot.com",
  messagingSenderId: "403109513058",
  appId: "1:403109513058:web:6721c5228b9556170e0e3b",
  measurementId: "G-WWHPX8TRKW"
};
const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence:
//     Platform.OS === "web"
//       ? browserSessionPersistence
//       : getReactNativePersistance(AsyncStorage),
// });
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
export const auth=initializeAuth(app);
export const firestore = getFirestore(app);
//Android:403109513058-7s8guvgia623i59a7m98lcdkts87crdg.apps.googleusercontent.com