import React, { useRef, useState } from 'react';
import styles from './VirtualList.module.scss';
import makeRange from './makeRange';

// TODO: tests, new file
const calcItemsRange = (
  itemHeight: number,
  scrollTop: number,
  listHeight: number,
  itemsCount: number,
  preRenderCount: number,
): [number, number] => {
  const visibleCount = listHeight / itemHeight;

  const firstVisibleItemIndex = Math.floor(scrollTop / itemHeight);

  const firstItemIndex = Math.max(
    0,
    firstVisibleItemIndex - preRenderCount,
  );

  const lastVisibleItemIndex = firstVisibleItemIndex + visibleCount;

  const lastItemIndex = Math.min(
    itemsCount,
    lastVisibleItemIndex + preRenderCount,
  );

  return [firstItemIndex, lastItemIndex];
};


interface IProps {
  preRenderCount?: number; // TODO: name
  itemsCount: number;
  itemHeight: number;
  listHeight: number; // TODO: auto
  children: (index: number) => JSX.Element;
}

const VirtualList: React.FC<IProps> = (props) => {
  const { itemsCount, itemHeight, preRenderCount = 10 } = props;
  const renderItem = props.children;

  const [scrollTop, setScrollTop] = useState(0);

  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = (e: any) => {
    // TODO: throttle
    setScrollTop(e.target.scrollTop);
  };

  const [firstItemIndex, lastItemIndex] = calcItemsRange(
    itemHeight,
    scrollTop,
    props.listHeight,
    itemsCount,
    preRenderCount,
  );

  const itemsArray = makeRange(firstItemIndex, lastItemIndex);

  const itemsOffset = firstItemIndex * itemHeight;

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
        <div style={{ transform: `translateY(${itemsOffset}px)` }}>
          {itemsArray.map((idx) => renderItem(idx))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
