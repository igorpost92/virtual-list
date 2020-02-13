import React from 'react';
import styles from './VirtualList.module.scss';

interface IProps {
  itemsCount: number;
  height: number;
  renderItem: (index: number) => JSX.Element;
}

const VirtualList: React.FC<IProps> = (props) => {
  const { itemsCount } = props;

  return (
    <div className={styles.list} style={{ height: itemsCount * props.height }}>
      <div className={styles.items}>
        {[...Array(itemsCount)].map((_, idx) => {
          return props.renderItem(idx);
        })}
      </div>

    </div>
  );
};

export default VirtualList;
