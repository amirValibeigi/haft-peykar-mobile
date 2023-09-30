import Colors from '@colors';
import t from '@libs/translate';
import React from 'react';

export interface AppBarState {
  bgColor?: string;
  color?: string;
  colorDark?: string;
  isDark?: boolean;
  isDarkStatus?: boolean;
  isShowBack?: boolean;
  isShowDrawer?: boolean;
  show?: boolean;
  showDrawer?: boolean;
  showLogo?: boolean;
  title?: string;
}

export interface AppBarContextProps extends AppBarState {
  setConfigAppBar: (config: AppBarState) => void;
}

const AppBarContext = React.createContext<AppBarContextProps>(
  {} as AppBarContextProps,
);

export const useAppBarContext = () => React.useContext(AppBarContext);

export const AppBarContextProvider = ({children}: any) => {
  const [state, setState] = React.useState<AppBarState>({
    color: Colors.primary,
    colorDark: Colors.primaryDark,
    isShowDrawer: false,
    show: false,
    showDrawer: true,
    showLogo: true,
    title: t('name_app'),
  });
  const setConfigAppBar = React.useCallback(
    (config: AppBarState) => {
      setState(ss => ({...ss, ...config}));
    },
    [setState],
  );

  const _value = React.useMemo(
    () => ({
      ...state,
      setConfigAppBar,
    }),
    [state, setConfigAppBar],
  );

  return (
    <AppBarContext.Provider value={_value}>{children}</AppBarContext.Provider>
  );
};

export default AppBarContext;
