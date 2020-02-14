import React from 'react';
import styles from './App.module.scss';
import VirtualList from './VirtualList';

const itemHeight = 50;

const App = () => {
  const renderItem = (index: number) => {
    return (
      <div className={styles.listItem} style={{ height: itemHeight }}>
        {index}
      </div>
    );
  };

  return (
    <div className={styles.listWrapper}>
      <VirtualList itemsCount={10000} itemHeight={50} listHeight={800}>
        {renderItem}
      </VirtualList>
    </div>
  );
};

export default App;
