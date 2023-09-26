import React from 'react';
import {View} from 'react-native-animatable';
import {SvgProps} from 'react-native-svg';
import {styles} from './styles';
import Colors from '@colors';

function TabBarIcon(Icon: React.FC<SvgProps>, {focused}: {focused?: boolean}) {
  return (
    <View style={styles.icon} animation="bounceIn">
      <Icon
        width="100%"
        height="100%"
        fill={focused ? Colors.primary : Colors.gray}
      />
    </View>
  );
}

export default TabBarIcon;
