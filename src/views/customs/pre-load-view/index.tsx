import {useLSize} from '@hooks/layout-size';
import {styles} from './styles';
import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface PreLoadViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children: any;
  show?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onChangeSize?: (size: {width: number; height: number}) => void;
}

function PreLoadView({
  style,
  children,
  show,
  onLayout,
  onChangeSize,
  ...otherProps
}: PreLoadViewProps) {
  const {width, height, setLayout} = useLSize({onLayout});
  const isShow = React.useMemo(
    () => (show ?? true) && width > 0 && height > 0,
    [width, height, show],
  );

  React.useEffect(() => {
    const _sizes = getSize(children);

    onChangeSize?.({
      width: width + _sizes.width,
      height: height + _sizes.height,
    });
  }, [width, height, children.props.style, children, onChangeSize]);

  if (children instanceof Array) {
    return (
      <View
        style={[style, isShow ? {} : styles.hide]}
        onLayout={setLayout}
        {...otherProps}>
        {children}
      </View>
    );
  }

  return React.cloneElement(children, {
    onLayout: setLayout,
    style: [children.props.style, isShow ? {} : styles.hide],
  });
}

function getSize(child: any) {
  const {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginStart,
    marginEnd,
    marginVertical,
    marginHorizontal,
  } = child?.props?.style ?? {};

  const _width =
    (marginRight ?? 0) +
    (marginStart ?? 0) +
    (marginLeft ?? 0) +
    (marginEnd ?? 0);

  const _height = (marginTop ?? 0) + (marginBottom ?? 0);

  return {
    width: (_width > 0 ? _width : undefined) ?? marginHorizontal ?? margin ?? 0,
    height:
      (_height > 0 ? _height : undefined) ?? marginVertical ?? margin ?? 0,
  };
}

export default React.memo(PreLoadView);
