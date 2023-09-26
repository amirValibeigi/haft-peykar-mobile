import {AppBarViewRefType, useHook} from './hook';
import {StatusBar, Text, View} from 'react-native';

import {Appbar} from 'react-native-paper';
import Icon from './Icon';
import ImageView from '@customs/image-view';
import React from 'react';
import {styles} from './styles';

interface AppBarViewProps {
  title?: string;
  onPressBack?: () => void;
}

const AppBarView = React.forwardRef<AppBarViewRefType, AppBarViewProps>(
  ({title: _title, onPressBack}: AppBarViewProps, ref) => {
    const {
      bgColor,
      color,
      colorDark,
      isDark,
      isDarkStatus,
      isShowBack,
      show,
      showLogo,
      title,
    } = useHook(ref);

    const data = React.useMemo(
      () => ({
        styleTitles: (isDark && color && {color}) || {},
        appBarShow: {display: show ? 'flex' : 'none'},
        lyAppbar: {backgroundColor: bgColor},
      }),
      [isDark, color, show, bgColor],
    );

    return (
      <View>
        <StatusBar
          key="status"
          backgroundColor={colorDark}
          barStyle={isDarkStatus ? 'dark-content' : 'light-content'}
        />
        <Appbar
          key="toolbar"
          theme={{colors: {primary: bgColor ?? color}}}
          style={[styles.appBar as any, data.appBarShow, data.lyAppbar]}>
          <View style={styles.containerLogo}>
            {isShowBack && (
              <Icon
                name="md-arrow-back"
                color={(isDark && color) || '#fff'}
                size={25}
                onPress={onPressBack}
              />
            )}
          </View>
          <View style={styles.containerIcons}>
            {(_title || title) && (
              <Text style={[styles.title, data.styleTitles]}>
                {_title ?? title}
              </Text>
            )}
          </View>
          {showLogo && (
            <ImageView
              style={styles.imageLogo}
              source={require('@assets/image_logo.png')}
              errorSource={require('@assets/image_logo.png')}
            />
          )}
        </Appbar>
      </View>
    );
  },
);

export default React.memo(AppBarView);
