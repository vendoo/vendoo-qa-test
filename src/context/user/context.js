import { createContext } from "react";

export const defaultUser = {
  uid: "",
  status: "loading",
  email: "",
};

const UserContext = createContext(defaultUser);

export default UserContext;
