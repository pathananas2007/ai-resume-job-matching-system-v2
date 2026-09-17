import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3Ysq-0j17IPfeteF66ZWkqgABi2NkT7Q",
  authDomain: "gen-lang-client-0473424735.firebaseapp.com",
  projectId: "gen-lang-client-0473424735",
  storageBucket: "gen-lang-client-0473424735.firebasestorage.app",
  messagingSenderId: "596559079995",
  appId: "1:596559079995:web:81de67c7dada77ad934a1e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
