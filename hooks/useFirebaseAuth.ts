// import { useState, useEffect } from "react";

// import Firebase from "Firebase/app";

// const formatAuthUser = (user: { uid: string; email: string }) => ({
//   uid: user.uid,
//   email: user.email,
// });

// export default function useFirebaseAuth() {
//   const [authUser, setAuthUser] = useState<{ uid: string; email: string }>({
//     uid: "",
//     email: "",
//   });
//   const [loading, setLoading] = useState<boolean>(true);

//   const authStateChanged = async (authState) => {
//     if (!authState) {
//       setAuthUser({
//         uid: "",
//         email: "",
//       });
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const formattedUser = formatAuthUser(authState);
//     setAuthUser(formattedUser);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged); // @TODO maybe get this from context??
//     return () => unsubscribe();
//   }, []);

//   return {
//     authUser,
//     loading,
//   };
// }
