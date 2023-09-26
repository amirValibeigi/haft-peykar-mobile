import React from 'react';
import HomePage from '@pages/home-page';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import t from '@libs/translate';
import {BottomTabStackParamList} from './stack-param-list.type';
import BottomTabComponent from '@components/bottom-tab-component';
import SVG_Dashboard from '@assets/svg_dashboard.svg';
import SVG_Dictionary from '@assets/svg_dictionary.svg';
import SVG_Podcast from '@assets/svg_podcast.svg';
import TabBarIcon from '@customs/tab-bar-icon';
import DictionaryPage from '@pages/dictionary-page';
import PodcastPage from '@pages/podcast-page';

const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabRoute = () => {
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

export default React.memo(BottomTabRoute);
