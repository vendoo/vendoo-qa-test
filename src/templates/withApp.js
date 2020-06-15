// Libs
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Firebase from "../firebase/app";
import { useUser } from "../context/user";

const App = (Component) => (props) => {
  const router = useRouter();
  const user = useUser();
  const handleLogoutClick = async () => {
    router.push("/");
    await Firebase.auth.signOut();
  };
  // Redirect if not logged in
  useEffect(() => {
    if (user.status === "loggedOut") {
      router.push("/");
    }
  }, [user.status]);

  return (
    <div>
      <div style={{ float: "right" }}>
        <button onClick={handleLogoutClick}>Log Out</button>
      </div>
      <h5>Vendoo | Welcome {user.email}</h5>
      <Component {...props} />
    </div>
  );
};

export default App;
