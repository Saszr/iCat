import React from 'react';

import AccountTabs from '../index';

const Demo = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <AccountTabs defaultActiveKey="1">
          <AccountTabs.TabPane tab="标签页一" key="1">
            <div>{Math.random()}</div>
          </AccountTabs.TabPane>
          <AccountTabs.TabPane tab="标签页二" key="2">
            <div>{Math.random()}</div>
          </AccountTabs.TabPane>
        </AccountTabs>
      </div>
    </div>
  );
};

export default Demo;
