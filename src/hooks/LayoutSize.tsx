import React from 'react';
import {LayoutChangeEvent} from 'react-native';

interface UseLSizeProps {
  initWidth?: number;
  iniHeight?: number;
  initX?: number;
  initY?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function useLSize(props?: UseLSizeProps) {
  const [wh, setWH] = React.useState({
    width: props?.initWidth ?? 0,
    height: props?.iniHeight ?? 0,
    x: props?.initX ?? 0,
    y: props?.initY ?? 0,
    target: undefined,
  });

  const getLayout = React.useCallback(
    (target: any) => {
      target?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setWH({
            width: width ?? props?.initWidth ?? 0,
            height: height ?? props?.iniHeight ?? 0,
            x: pageX ?? props?.initX ?? 0,
            y: pageY ?? props?.initY ?? 0,
            target,
          });
        },
      );
    },
    [props?.iniHeight, props?.initWidth, props?.initX, props?.initY],
  );

  const setLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      getLayout(e?.target);
      props?.onLayout?.(e);
    },
    [getLayout, props],
  );

  const reload = React.useCallback(() => {
    getLayout(wh.target);
  }, [getLayout, wh.target]);

  return {...wh, setLayout, reload};
}
