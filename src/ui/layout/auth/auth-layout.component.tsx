import { FC, PropsWithChildren } from "react";
import Header from "./header.component";
import styles from "./auth-layout.module.scss";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Header />
      {children}
    </main>
  )
}

export default AuthLayout;
