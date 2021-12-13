import React from 'react';
import './basic.less';

const getListData = () => {
  return new Promise((resolve) => {
    const data: number[] = [];
    for (let i = 0; i < 200; i++) {
      data.push(i);
    }

    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const useRenderList = (list) => {
  let key: number = 1;
  return list.map((item) => {
    return <div key={key++}>{item}</div>;
  });
};

const Demo = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    getListData().then((res) => {
      setList(res);
    });
  }, []);

  return <div className="main"> {useRenderList(list)}</div>;
};

export default Demo;
