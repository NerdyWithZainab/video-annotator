import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Local

import { secrets } from "./keys";

export const firebaseConfig = {
  apiKey: secrets?.apiKey || "",
  authDomain: secrets?.authDomain || "",
  projectId: secrets?.projectId || "",
  storageBucket: secrets?.storageBucket || "",
  messagingSenderId: secrets?.messagingSenderId || "",
  appId: secrets?.appId || "",
  measurementId: secrets?.measurementId || "",
};

// Remote

// export const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messageSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
