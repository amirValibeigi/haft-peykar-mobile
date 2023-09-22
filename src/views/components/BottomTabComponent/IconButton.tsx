import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native-animatable';

interface IconButtonProps {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  options: BottomTabNavigationOptions;
  focused: boolean;
  onPress?: () => void;
}

function IconButton({
  style,
  titleStyle,
  options,
  focused,
  onPress,
}: IconButtonProps) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View>
        {options.tabBarIcon?.({
          focused,
          color: colors.primary,
          size: 20,
        })}
        {focused && (
          <Text style={titleStyle} animation="bounceInUp">
            {options.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(IconButton);
