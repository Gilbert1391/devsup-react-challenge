import React, { ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className={`${styles.page}`}>{children}</div>;
};

export default Page;
