import React, { ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  children: ReactNode;
  style?: any;
}

const Page: React.FC<PageProps> = ({ children, style }) => {
  return (
    <div className={`${styles.page}`} style={style}>
      {children}
    </div>
  );
};

export default Page;
