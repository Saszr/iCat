import React from 'react';
import { useMemoizedFn, useSize, useLatest, useEventListener } from 'ahooks';
import { getTargetElement } from './domTarget';
import type { BasicTarget } from './domTarget';

export interface Options<T> {
  containerTarget: BasicTarget;
  wrapperTarget: BasicTarget;
  itemHeight: number | ((index: number, data: T) => number);
  overscan?: number;
}

const useVirtualList = <T extends unknown>(list: T[], options: Options<T>) => {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;

  const itemHeightRef = useLatest(itemHeight);

  const size = useSize(containerTarget);

  const scrollTriggerByScrollToFunc = React.useRef(false);

  const [targetList, setTargetList] = React.useState<{ index: number; data: T }[]>([]);

  const getVisibleCount = (containerHeight: number, fromIndex: number) => {
    if (typeof itemHeightRef.current === 'number') {
      return Math.ceil(containerHeight / itemHeightRef.current);
    }

    let sum = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      endIndex = i;
      if (sum >= containerHeight) {
        break;
      }
    }
    return endIndex - fromIndex;
  };

  const getOffset = (scrollTop: number) => {
    if (typeof itemHeightRef.current === 'number') {
      return Math.floor(scrollTop / itemHeightRef.current) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  const getDistanceTop = (index: number) => {
    if (typeof itemHeightRef.current === 'number') {
      const height = index * itemHeightRef.current;
      return height;
    }
    const height = list
      .slice(0, index)
      // @ts-ignore
      .reduce((sum, _, i) => sum + itemHeightRef.current(i, list[index]), 0);
    return height;
  };

  const totalHeight = React.useMemo(() => {
    if (typeof itemHeightRef.current === 'number') {
      return list.length * itemHeightRef.current;
    }
    // @ts-ignore
    return list.reduce((sum, _, index) => sum + itemHeightRef.current(index, list[index]), 0);
  }, [list, itemHeightRef]);

  const calculateRange = useMemoizedFn(() => {
    const container = getTargetElement(containerTarget);
    const wrapper = getTargetElement(wrapperTarget);

    if (container && wrapper) {
      const { scrollTop, clientHeight } = container;

      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight, offset);

      const start = Math.max(0, offset - overscan);
      const end = Math.min(list.length, offset + visibleCount + overscan);

      const offsetTop = getDistanceTop(start);

      // @ts-ignore
      wrapper.style.height = totalHeight - offsetTop + 'px';
      // @ts-ignore
      wrapper.style.marginTop = offsetTop + 'px';

      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        })),
      );
    }
  });

  React.useEffect(() => {
    if (!size?.width || !size?.height) {
      return;
    }
    calculateRange();
  }, [size?.width, size?.height, list, calculateRange]);

  useEventListener(
    'scroll',
    (e) => {
      if (scrollTriggerByScrollToFunc.current) {
        scrollTriggerByScrollToFunc.current = false;
        return;
      }
      e.preventDefault();
      calculateRange();
    },
    {
      target: containerTarget,
    },
  );

  const scrollTo = (index: number) => {
    const container = getTargetElement(containerTarget);
    if (container) {
      scrollTriggerByScrollToFunc.current = true;
      container.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  return [targetList, useMemoizedFn(scrollTo)] as const;
};

export default useVirtualList;
