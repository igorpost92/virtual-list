import React, { useRef, useState } from 'react';
import styles from './VirtualList.module.scss';
import makeRange from './makeRange';

interface IProps {
  preRenderCount?: number; // TODO: name
  itemsCount: number;
  itemHeight: number;
  listHeight: number; // TODO: auto
  children: (index: number) => JSX.Element;
}

// const calcStartItemIndex = (
//   scrollTop: number,
//   listHeight: number,
//   itemsCount: number,
//   prePrenderCount: number,
// ) => {
//   console.log();
// };

const VirtualList: React.FC<IProps> = (props) => {
  const { itemsCount, itemHeight, preRenderCount = 10 } = props;
  const renderItem = props.children;

  const [scrollTop, setScrollTop] = useState(0);

  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };

  const length = props.listHeight / itemHeight;

  const firstVisibleItemIndex = Math.floor(scrollTop / itemHeight);
  const lastVisibleItemIndex = firstVisibleItemIndex + length;

  const firstItemIndex = Math.max(
    0,
    firstVisibleItemIndex - preRenderCount,
  );

  const lastItemIndex = Math.min(
    itemsCount,
    lastVisibleItemIndex + preRenderCount,
  );

  console.log(scrollTop, firstItemIndex, lastItemIndex);

  const itemsArray = makeRange(firstItemIndex, lastItemIndex);

  // console.log(itemsArray);

  const itemsOffset = firstVisibleItemIndex

  return (
    <div
      ref={scroller}
      className={styles.scroller}
      style={{ height: props.listHeight }}
      onScroll={onScroll}
    >
      <div
        className={styles.wrapper}
        style={{ height: itemsCount * itemHeight }}
      >
        <div className={styles.items} style={{ transform: `translateY(${-scrollTop}px)` }}>
          {itemsArray.map((idx) => renderItem(idx))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
