import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {styles} from '@components/drawer-component/Button.styles';

export interface ButtonIconProp {
  children: string;
  select?: boolean;
  icon: React.FC<SvgProps>;
  onPress: () => void;
}

const ButtonIcon = ({
  children,
  select,
  icon: Icon,
  onPress,
}: ButtonIconProp) => {
  return (
    <TouchableOpacity
      style={[styles.container, select && styles.containerSelect]}
      onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.lyIcon}>
          <Icon width="100%" height="100%" fill="white" />
        </View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ButtonIcon;
