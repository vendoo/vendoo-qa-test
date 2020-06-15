import React, { useEffect, useContext, useState, ReactNode } from "react";

import UserContext, { defaultUser } from "./context";

import Firebase from "../../firebase/app";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  // Set Listener
  useEffect(() => {
    return Firebase.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser({
          status: "loggedIn",
          uid: userAuth.uid,
          email: userAuth.email,
        });
      } else {
        setUser({
          ...defaultUser,
          status: "loggedOut",
        });
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
