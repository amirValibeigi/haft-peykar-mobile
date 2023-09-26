import React from 'react';

export interface BottomTabState {
  size: number;
}

export interface BottomTabContextProps extends BottomTabState {
  setConfigBottomTab: (config: BottomTabState) => void;
}

const BottomTabContext = React.createContext<BottomTabContextProps>(
  {} as BottomTabContextProps,
);

export const useBottomTabContext = () => React.useContext(BottomTabContext);

export const BottomTabContextProvider = ({children}: any) => {
  const [state, setState] = React.useState<BottomTabState>({
    size: 0,
  });
  const setConfigBottomTab = React.useCallback(
    (config: BottomTabState) => {
      setState(ss => ({...ss, ...config}));
    },
    [setState],
  );

  const _value = React.useMemo(
    () => ({
      ...state,
      setConfigBottomTab,
    }),
    [state, setConfigBottomTab],
  );

  return (
    <BottomTabContext.Provider value={_value}>
      {children}
    </BottomTabContext.Provider>
  );
};

export default BottomTabContext;
