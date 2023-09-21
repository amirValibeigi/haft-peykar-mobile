import {Colors} from '@GlobalStyles';
import React from 'react';
import ContentLoader, {IContentLoaderProps} from 'react-content-loader/native';

interface PlaceholderViewProps extends IContentLoaderProps {
  children: any | any[];
  visible: boolean;
  withView?: boolean | number;
}

function PlaceholderView({
  style,
  visible,
  withView = false,
  width,
  height,
  children,
  ...props
}: PlaceholderViewProps) {
  const {view, child} = React.useMemo(() => {
    if (withView === false) {
      return {child: children};
    }
    const _count = typeof withView === 'boolean' ? 1 : withView;

    return {
      view: children.slice(0, _count),
      child: children.slice(_count, children.length),
    };
  }, [withView, children]);

  if (
    width &&
    height &&
    (typeof width === 'number' ? width > 0 : true) &&
    (typeof height === 'number' ? height > 0 : true)
  ) {
    if (withView) {
      if (!visible) {
        return <>{view}</>;
      }
    }

    return (
      <ContentLoader
        style={style}
        width={width}
        height={height}
        speed={1.5}
        foregroundColor={Colors.whiteEAEA}
        {...props}>
        {child}
      </ContentLoader>
    );
  }
  return <></>;
}

export default React.memo(PlaceholderView);
