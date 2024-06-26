import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import '../components/AppHeader.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (typeof window !== 'undefined') {
  const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)