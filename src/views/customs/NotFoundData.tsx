import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import GlobalStyles from '@GlobalStyles';
import {getString} from '@libs/Translate';

interface NotFoundDataProps {
  title?: string;
  image?: ImageSourcePropType | string;
  size?: number;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const NotFoundData = ({
  title = getString('not_found_content'),
  image = require('@assets/image_not_found.png'),
  size = 100,
  visible = true,
  style,
  textStyle,
}: NotFoundDataProps) => {
  return (
    <View style={[styles.container, !visible && styles.hide, style]}>
      <Image
        source={
          typeof image === 'string'
            ? {uri: image}
            : (image as ImageSourcePropType)
        }
        style={{width: size, height: size}}
      />
      <Text style={[GlobalStyles.text, styles.title, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...GlobalStyles.text,
    margin: 10,
    fontSize: 14,
  },
  hide: {
    display: 'none',
  },
});

export default React.memo(NotFoundData);
