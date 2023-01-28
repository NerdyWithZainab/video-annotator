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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("deleteMe firebaseConfig is: ");
console.log(firebaseConfig);

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
