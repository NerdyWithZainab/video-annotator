// import { initializeApp } from "firebase/app";
// import { Auth, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Analytics, getAnalytics } from "firebase/analytics";

// import Firebase from "Firebase/app";
// import 'Firebase/auth';

// Local

// import { secrets } from "./keys";

// export const firebaseConfig = {
//   apiKey: secrets?.apiKey || "",
//   authDomain: secrets?.authDomain || "",
//   projectId: secrets?.projectId || "",
//   storageBucket: secrets?.storageBucket || "",
//   messagingSenderId: secrets?.messagingSenderId || "",
//   appId: secrets?.appId || "",
//   measurementId: secrets?.measurementId || "",
// };

// Remote

export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messageSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

//

// Initialize Firebase various different ways

// if(!Firebase.apps.length){
//   Firebase.initializeApp(firebaseConfig);
// }

//Ended up not being able to use these here because of "Cannot use import statement outside a module" error with the tests
// const app = initializeApp(firebaseConfig);
// // initializeApp(firebaseConfig);
// export let analytics: Analytics | null = null;
// if (app.name && typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }
// const auth: Auth | null = getAuth(app) || null;
// // const createUserWithEmailAndPassword: any = createUserWithEmailAndPassword;

// // To test the hypothesis that there was some issue with importing createUserWithEmailAndPassword directly

// export const wrapper = { auth, createUserWithEmailAndPassword };
