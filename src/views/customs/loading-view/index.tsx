import ImageView from '@customs/image-view';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface LoadingViewProps {
  show?: boolean;
}

interface LoadingViewAccess {
  showLoading: () => void;
  hideLoading: () => void;
  isShowLoading: () => boolean;
}

const globalRef = React.createRef<LoadingViewAccess>();

const LoadingView = React.forwardRef<LoadingViewAccess, LoadingViewProps>(
  ({show}, ref) => {
    const [isShow, setIsShow] = React.useState(show);

    React.useImperativeHandle(
      ref,
      () => ({
        showLoading: () => {
          setIsShow(true);
        },
        hideLoading: () => {
          setIsShow(false);
        },
        isShowLoading: () => {
          return isShow ?? false;
        },
      }),
      [isShow, setIsShow],
    );

    if (!isShow) {
      return <></>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.bg}>
          <ImageView
            style={styles.img}
            source={require('@assets/gif_loading.gif')}
          />
        </View>
      </View>
    );
  },
);

export const ContainerLoadingView = React.memo(({show}: LoadingViewProps) => {
  return <LoadingView ref={globalRef} show={show} />;
});

export function showLoading() {
  globalRef?.current?.showLoading();
}

export function hideLoading() {
  globalRef?.current?.hideLoading();
}

export function isLoading() {
  return globalRef?.current?.isShowLoading() ?? false;
}

export default React.memo(LoadingView);
