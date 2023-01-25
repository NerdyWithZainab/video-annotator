import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Analytics, getAnalytics } from "firebase/analytics";

// import Firebase from "Firebase/app";
// import 'Firebase/auth';

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
// if(!Firebase.apps.length){
//   Firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
export let analytics: Analytics | null = null;
if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export const auth: Auth | null = getAuth(app) || null;
