import React from 'react';
import {
  ImageProps,
  ImageSourcePropType,
  ImageURISource,
  View,
  ViewProps,
} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

type addPrefixToObject<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

export type ImageViewProps = {
  errorSource?: ImageSourcePropType | React.JSX.Element;
} & Partial<
  FastImageProps &
    ImageProps &
    ViewProps &
    addPrefixToObject<FastImageProps, 'e_'>
>;

type ImageViewState = {
  isError: boolean;
};

export default class ImageView extends React.Component<
  Omit<ImageViewProps, 'e_source'>,
  ImageViewState
> {
  state = {
    isError: false,
  };

  constructor(props: ImageViewProps) {
    super(props);

    if ((props?.source as ImageURISource)?.uri?.length === 0) {
      this.state.isError = true;
    }
  }

  render() {
    const {isError} = this.state;
    const {source, errorSource, ...props} = this.props;
    const _isError = isError || !source;

    if (_isError && React.isValidElement(errorSource)) {
      return <View {...this.#getProps(props, _isError)}>{errorSource}</View>;
    }

    return (
      <FastImage
        {...this.#getProps(props, _isError)}
        source={
          (_isError
            ? !React.isValidElement(errorSource)
              ? errorSource ?? require('@assets/image_placeholder.png')
              : require('@assets/image_placeholder.png')
            : source) as Source
        }
        onError={this.#onError}
      />
    );
  }

  #onError = () => {
    this.setState({isError: true});
  };

  #getProps = (props: {[key: string]: any}, isError: boolean) => {
    const keys = Object.keys(props).filter(k => k.includes('e_'));

    let newObj: {[key: string]: any} = {};

    if (isError) {
      keys.forEach(key => (newObj[key.replace(/e_/, '')] = props[key]));
    }

    return {
      ...props,
      ...newObj,
      style: [props.style, newObj.style],
    };
  };
}
