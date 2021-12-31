import React from 'react';
import Drawer from '../index';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        Demo
      </button>
      <Drawer
        visible={visible}
        width="300px"
        onClose={() => {
          setVisible(false);
        }}
      >
        <div style={{ padding: '0 10px' }}>Demo</div>
      </Drawer>
    </>
  );
};

export default Demo;
