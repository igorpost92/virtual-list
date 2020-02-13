import React from 'react';
import styles from './App.module.scss';
import VirtualList from './VirtualList';

const App = () => {
  const renderItem = (index: number) => {
    return (
      <div className={styles.listItem}>
        {index}
      </div>
    );
  };

  return (
    <div className={styles.listWrapper}>
      <VirtualList itemsCount={1000} height={50} renderItem={renderItem} />
    </div>
  );
};

export default App;
