import { FC, PropsWithChildren } from "react";

import Header from "./header.component";
import styles from "./auth-layout.module.scss";
import { Footer } from "@/ui/components";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default AuthLayout;
