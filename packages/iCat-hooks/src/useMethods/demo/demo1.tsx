import useMethods from '../index';
import { message } from 'antd';
import React, { useCallback, useRef, useState } from 'react';

const ExpensiveTree = React.memo<Record<string, any>>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <button type="button" onClick={showCount}>
        showParentCount
      </button>
    </div>
  );
});

export default () => {
  const [count, setCount] = useState(0);

  const { method1, method2, method3 } = useMethods({
    method1() {
      message.info(`Current count is ${count}`);
    },
    method2() {
      // 直接调用 method1
      method1();
      // 其他逻辑
    },
    method3() {
      setCount(3);
      // 更多...
    },
  });

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </button>

      <div style={{ marginTop: 32 }}>
        <h3>method1</h3>
        <ExpensiveTree showCount={method1} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>method2</h3>
        <ExpensiveTree showCount={method2} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>method3</h3>
        <ExpensiveTree showCount={method3} />
      </div>
    </>
  );
};
