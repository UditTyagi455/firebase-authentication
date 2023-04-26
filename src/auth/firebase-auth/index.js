import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1Zb1JFCMEJM22bVFlUSep2KcqiPp9NXQ",
  authDomain: "using-firebase-8c9fc.firebaseapp.com",
  databaseURL: "https://using-firebase-8c9fc-default-rtdb.firebaseio.com",
  projectId: "using-firebase-8c9fc",
  storageBucket: "using-firebase-8c9fc.appspot.com",
  messagingSenderId: "1092398978420",
  appId: "1:1092398978420:web:0ab898146ecaff5740c821",
  measurementId: "G-5STM4YG4FG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app ;