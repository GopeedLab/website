"use client";

import { useEffect } from "react";

export function FirebaseAnalytics() {
  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      import("firebase/analytics").then(({ getAnalytics }) => {
        const firebaseConfig = {
          apiKey: "AIzaSyBG1Jyk-3J5lgSXAmmjyQjCnxTLQS5e-VU",
          authDomain: "gopeed-4de76.firebaseapp.com",
          projectId: "gopeed-4de76",
          storageBucket: "gopeed-4de76.appspot.com",
          messagingSenderId: "742279468136",
          appId: "1:742279468136:web:ba58cebb34e2c9eec897dd",
          measurementId: "G-V552GWR1DN",
        };

        const app = initializeApp(firebaseConfig);
        getAnalytics(app);
      });
    });
  }, []);

  return null;
}

