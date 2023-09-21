import React from 'react';
import {AppBarState, useAppBarContext} from '@contexts/AppBarContext';

export type AppBarViewRefType = {
  hide: () => void;
  show: () => void;
  setTitle: (title: string) => void;
  setColor: (color: string) => void;
  setColorDark: (colorDark: string) => void;
  setBgColor: (bgColor: string) => void;
  setShow: (show: boolean) => void;
  setIsShowBack: (isShowBack: boolean) => void;
  setIsDark: (isDark: boolean) => void;
  setConfigAppBar: (configs: AppBarState) => void;
};

export function useHook(ref: React.ForwardedRef<AppBarViewRefType>) {
  const {setConfigAppBar, ...otherProps} = useAppBarContext();

  React.useImperativeHandle(
    ref,
    () => ({
      hide: () => {
        setConfigAppBar({show: false});
      },
      show: () => {
        setConfigAppBar({show: true});
      },
      setTitle: (_title: string) => setConfigAppBar({title: _title}),
      setColor: (_color: string) => setConfigAppBar({color: _color}),
      setColorDark: (_colorDark: string) =>
        setConfigAppBar({colorDark: _colorDark}),
      setBgColor: (_bgColor: string) => setConfigAppBar({bgColor: _bgColor}),
      setShow: (_show: boolean) => setConfigAppBar({show: _show}),
      setShowLogo: (_showLogo: boolean) =>
        setConfigAppBar({showLogo: _showLogo}),
      setIsShowBack: (_isShowBack: boolean) =>
        setConfigAppBar({isShowBack: _isShowBack}),
      setIsDarkStatus: (_isDarkStatus: boolean) =>
        setConfigAppBar({isDarkStatus: _isDarkStatus}),
      setIsDark: (_isDark: boolean) => setConfigAppBar({isDark: _isDark}),
      setConfigAppBar,
    }),
    [setConfigAppBar],
  );

  return {
    ...otherProps,
    setConfigAppBar,
  };
}
