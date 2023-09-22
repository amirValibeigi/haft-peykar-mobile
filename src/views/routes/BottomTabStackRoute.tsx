import React from 'react';
import HomePage from '@pages/HomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import t from '@libs/Translate';
import {BottomTabStackParamList} from './RootStackParamListType';
import BottomTabComponent from '@components/BottomTabComponent';
import SVG_Dashboard from '@assets/svg_dashboard.svg';
import SVG_Dictionary from '@assets/svg_dictionary.svg';
import SVG_Podcast from '@assets/svg_podcast.svg';
import TabBarIcon from '@customs/TabBarIcon';
import DictionaryPage from '@pages/DictionaryPage';
import PodcastPage from '@pages/PodcastPage';

const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStackRoute = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="homePage"
      screenOptions={{headerShown: false}}
      tabBar={BottomTabComponent}>
      <BottomTab.Screen
        name="podcastPage"
        component={PodcastPage}
        options={{
          title: t('podcast'),
          tabBarIcon: TabBarIcon.bind(this, SVG_Podcast),
        }}
      />
      <BottomTab.Screen
        name="homePage"
        component={HomePage}
        options={{
          title: t('dashboard'),
          tabBarIcon: TabBarIcon.bind(this, SVG_Dashboard),
        }}
      />
      <BottomTab.Screen
        name="dictionaryPage"
        component={DictionaryPage}
        options={{
          title: t('dictionary'),
          tabBarIcon: TabBarIcon.bind(this, SVG_Dictionary),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default React.memo(BottomTabStackRoute);
