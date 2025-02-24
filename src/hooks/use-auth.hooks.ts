import { useContext } from "react"
import { AuthContext } from "@/contexts/auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Must be used inside an auth provider");
  }

  return context;
}
