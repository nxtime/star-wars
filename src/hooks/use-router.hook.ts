import { useContext } from "react"

import { RouterContext } from "@/contexts/routes.context";

export const useRouter = () => {
  const context = useContext(RouterContext);

  if (context === null) {
    throw new Error("Must be used inside a router provider");
  }

  return context;
}
