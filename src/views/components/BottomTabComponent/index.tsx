import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import IconButton from './IconButton';
import {CommonActions} from '@react-navigation/native';
import {useLSize} from '@hooks/LayoutSize';
import {useBottomTabContext} from '@contexts/BottomTabContext';

function BottomTabComponent(props: BottomTabBarProps) {
  return <_BottomTabComponent {...props} />;
}

const _BottomTabComponent = React.memo(
  ({descriptors, state, navigation}: BottomTabBarProps) => {
    const {routes} = state;
    const {setConfigBottomTab} = useBottomTabContext();
    const {height, setLayout} = useLSize();

    React.useEffect(() => {
      setConfigBottomTab?.({size: height});
    }, [height, setConfigBottomTab]);

    return (
      <View style={styles.container} onLayout={setLayout}>
        {routes.map((route, index) => {
          const focused = index === state.index;
          const {options} = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate({name: route.name, merge: true}),
                target: state.key,
              });
            }
          };

          return (
            <IconButton
              style={styles.buttonIcon}
              titleStyle={styles.buttonIconTitle}
              key={route.key}
              focused={focused}
              options={options}
              onPress={onPress}
            />
          );
        })}
      </View>
    );
  },
);

export default BottomTabComponent;
