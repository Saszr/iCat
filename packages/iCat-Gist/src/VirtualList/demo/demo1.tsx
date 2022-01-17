import React from 'react';
import { useVirtualList } from 'ahooks';

const Demo1 = () => {
  const containerRef = React.useRef(null);
  const wrapperRef = React.useRef(null);

  const originalList = React.useMemo(() => Array.from(Array(99999).keys()), []);

  const [value, onChange] = React.useState<number>(0);

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (i, data) => {
      // const height = i % 2 === 0 ? 42 + 8 : 84 + 8;
      const height = 20;
      return height;
    },
    overscan: 10,
  });

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <input
          style={{ width: 120 }}
          placeholder="line number"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          style={{ marginLeft: 8 }}
          type="button"
          onClick={() => {
            scrollTo(Number(value));
          }}
        >
          scroll to
        </button>
      </div>
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo1;
