// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf28BJbpv9PIgQcjzcy00bJH2n8u__lGk",
  authDomain: "adopt-cat-82b81.firebaseapp.com",
  projectId: "adopt-cat-82b81",
  storageBucket: "adopt-cat-82b81.firebasestorage.app",
  messagingSenderId: "753136638366",
  appId: "1:753136638366:web:a0ef906a4393acfb0f1e8f",
  measurementId: "G-BT3CLJ18B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics only works in the browser (not during SSR/Node scripts) and only
// when supported by the environment, so guard it instead of calling it directly.
if (typeof window !== "undefined") {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) getAnalytics(app);
    })
    .catch(() => {});
}