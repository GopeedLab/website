import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import '../components/AppHeader.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: "AIzaSyBG1Jyk-3J5lgSXAmmjyQjCnxTLQS5e-VU",
    authDomain: "gopeed-4de76.firebaseapp.com",
    projectId: "gopeed-4de76",
    storageBucket: "gopeed-4de76.appspot.com",
    messagingSenderId: "742279468136",
    appId: "1:742279468136:web:ba58cebb34e2c9eec897dd",
    measurementId: "G-V552GWR1DN"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)