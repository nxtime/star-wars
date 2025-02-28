import { FC, PropsWithChildren } from "react";
import { Footer } from "@/ui/components";
import UserHeader from "./user-header.component";
import styles from "./user-layout.module.scss";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <UserHeader />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default UserLayout;
