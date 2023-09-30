import React from 'react';
import Toast from 'react-native-toast-message';
import getString from '@libs/translate';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllParamList} from '@routes/stack-param-list.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export function useUI(
  navigation: StackNavigationProp<AllParamList> &
    DrawerNavigationProp<AllParamList>,
) {
  const [focusRoute, setFocusRoute] = React.useState<keyof AllParamList>();

  const onPressData = React.useMemo(
    () => ({
      onPressPodcast: navigation.navigate.bind(null, 'bottomTabRoute' as any, {
        merge: true,
        screen: 'podcastPage',
      }),
      onPressDictionary: navigation.navigate.bind(
        null,
        'bottomTabRoute' as any,
        {
          merge: true,
          screen: 'dictionaryPage',
        },
      ),
      onPressHome: navigation.navigate.bind(null, 'bottomTabRoute' as any, {
        merge: true,
        screen: 'homePage',
      }),
      onPressNextVersion: () => {
        Toast.show({
          text1: getString('activity'),
          text2: getString('next_version'),
          type: 'info',
        });

        navigation.closeDrawer();
      },
    }),
    [navigation],
  );

  const onChangeState = React.useCallback((data: any) => {
    try {
      const {
        data: {state},
      } = data;
      let vRoute = state.routes[state.index];

      if (vRoute.name === 'drawerRoute') {
        vRoute = vRoute.state.routes[vRoute.state.index];

        if (vRoute.name === 'bottomTabRoute') {
          vRoute = vRoute.state?.routes?.[vRoute.state?.index];
          if (!vRoute) {
            setFocusRoute('homePage');
            return;
          }
        }
        setFocusRoute(vRoute.name);
      }
    } catch (e) {
      //ignore
    }
  }, []);

  React.useEffect(() => {
    navigation.addListener('state', onChangeState);
    return () => {
      navigation.removeListener('state', onChangeState);
    };
  }, [navigation, onChangeState]);
  //
  // const focus = React.useMemo(() => {
  //   return props.state.routes[props.state.index].name;
  // }, [props.state.index, props.state.routes]);

  return {...onPressData, focusRoute};
}
