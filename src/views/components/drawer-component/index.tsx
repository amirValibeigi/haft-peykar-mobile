import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {styles} from './styles';
import {View} from 'react-native';
import ButtonIcon from '@components/drawer-component/ButtonIcon';
import getString from '@libs/translate';
import SVG_Dashboard from '@assets/svg_dashboard.svg';
import SVG_Dictionary from '@assets/svg_dictionary.svg';
import SVG_Documentation from '@assets/svg_documentation.svg';
import SVG_Bookmark from '@assets/svg_bookmark.svg';
import SVG_LampDesk from '@assets/svg_desk_lamp.svg';
import SVG_Gallery from '@assets/svg_gallery.svg';
import SVG_Podcast from '@assets/svg_podcast.svg';
import SVG_Wikipedia from '@assets/svg_wikipedia.svg';
import SVG_Science from '@assets/svg_science.svg';
import SVG_Ganjor from '@assets/svg_ganjor.svg';
import SVG_Telegram from '@assets/svg_telegram.svg';
import SVG_Instagram from '@assets/svg_instagram.svg';
import SVG_Castbox from '@assets/svg_castbox.svg';
import SVG_Clubhouse from '@assets/svg_clubhouse.svg';
import Toast from 'react-native-toast-message';

const DrawerComponent = (props: DrawerContentComponentProps) => {
  const navigation = props.navigation as any;

  const {onPressHome, onPressDictionary, onPressBookmark, onPressNextVersion} =
    React.useMemo(
      () => ({
        onPressBookmark: navigation.navigate.bind(null, 'bottomTabRoute', {
          merge: true,
          screen: 'homePage',
        }),
        onPressDictionary: navigation.navigate.bind(null, 'bottomTabRoute', {
          merge: true,
          screen: 'dictionaryPage',
        }),
        onPressHome: navigation.navigate.bind(null, 'bottomTabRoute', {
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

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <ButtonIcon icon={SVG_Dashboard} onPress={onPressHome}>
        {getString('dashboard')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_LampDesk} onPress={onPressNextVersion}>
        {getString('last_study')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Bookmark} onPress={onPressBookmark}>
        {getString('bookmark')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Dictionary} onPress={onPressDictionary}>
        {getString('dictionary')}
      </ButtonIcon>
      <View style={styles.line} />

      <ButtonIcon icon={SVG_Documentation} onPress={onPressNextVersion}>
        {getString('articles')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Gallery} onPress={onPressNextVersion}>
        {getString('gallery')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Podcast} onPress={onPressNextVersion}>
        {getString('podcast')}
      </ButtonIcon>
      <View style={styles.line} />

      <ButtonIcon icon={SVG_Ganjor} onPress={onPressNextVersion}>
        {getString('ganjor')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Science} onPress={onPressNextVersion}>
        {getString('science')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Wikipedia} onPress={onPressNextVersion}>
        {getString('wikipedia_fa')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Wikipedia} onPress={onPressNextVersion}>
        {getString('wikipedia_en')}
      </ButtonIcon>
      <View style={styles.line} />

      <ButtonIcon icon={SVG_Telegram} onPress={onPressNextVersion}>
        {getString('telegram')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Instagram} onPress={onPressNextVersion}>
        {getString('instagram')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Castbox} onPress={onPressNextVersion}>
        {getString('castbox')}
      </ButtonIcon>
      <ButtonIcon icon={SVG_Clubhouse} onPress={onPressNextVersion}>
        {getString('clubhouse')}
      </ButtonIcon>
      <View style={styles.line} />
    </DrawerContentScrollView>
  );
};
export default DrawerComponent;
