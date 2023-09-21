import React from 'react';
import {TouchableOpacity} from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
}

const Icon = ({name, color, size, onPress}: IconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IoniconsIcons
        style={styles.icon}
        name={name}
        color={color}
        size={size}
      />
    </TouchableOpacity>
  );
};

export default React.memo(Icon);
