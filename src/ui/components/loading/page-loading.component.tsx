import { FC } from 'react';
import styles from './page-loading.module.scss';

interface LoadingProps {
  message?: string;
}

const PageLoading: FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.droid}>
          <div className={styles.head}>
            <div className={styles.eye}></div>
            <div className={styles.detail}></div>
          </div>
          <div className={styles.body}>
            <div className={styles.detail1}></div>
            <div className={styles.detail2}></div>
            <div className={styles.detail3}></div>
          </div>
          <div className={styles.legs}>
            <div className={styles.leg1}></div>
            <div className={styles.leg2}></div>
            <div className={styles.leg3}></div>
          </div>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default PageLoading;
