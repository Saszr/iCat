import React from 'react';

interface TabPaneProps {
  children: JSX.Element;
  active?: boolean;
  tab: string;
}

interface AccountTabsProps {
  children: JSX.Element[];
  defaultActiveKey: string;
}

const TabPane = (props: TabPaneProps) => {
  const { children, active } = props;

  const [visited, setVisited] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setVisited(true);
    }
  }, [active]);

  const mergedStyle: React.CSSProperties = {};
  if (!active) {
    mergedStyle.display = 'none';
  }

  return (
    <div style={{ ...mergedStyle }}>
      {visited && children}
    </div>
  );
};

const AccountTabs = (props: AccountTabsProps) => {
  const { children, defaultActiveKey } = props;

  const [active, setActive] = React.useState<React.Key>(defaultActiveKey);

  return (
    <div>
      <div
        style={{
          height: '46px',
          backgroundColor: '#DBDBDB',
          marginTop: '1rem',
          display: 'flex',
          boxShadow: '0px -7px 11px -2px rgb(0 0 0 / 10%)',
        }}
      >
        {React.Children.map(children, (child) => {
          return (
            <div
              style={{
                width: '180px',
                lineHeight: '46px',
                backgroundColor: `${active === child.key ? '#fff' : '#DBDBDB'}`,
                textAlign: 'center',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={() => setActive(child.key!)}
            >
              {child.props.tab}
            </div>
          );
        })}
      </div>

      {React.Children.map(children, (child) => {
        const enhancedChild = React.cloneElement(child, {
          code: child.key,
          active: active === child.key,
        });
        return enhancedChild;
      })}
    </div>
  );
};

AccountTabs.TabPane = TabPane;

export default AccountTabs;
