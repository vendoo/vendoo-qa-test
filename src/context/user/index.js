import { useContext } from "react";
import Context from "./context";
import Provider from "./provider";

export const UserProvider = Provider;

export function useUser() {
  const user = useContext(Context);
  if (!user) {
    throw new Error("User Context must be used within a User Provider");
  }
  return user;
}

export default Context;
