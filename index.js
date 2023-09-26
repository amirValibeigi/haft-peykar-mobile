/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

import IndexPage from '@pages/index-page';

AppRegistry.registerComponent(appName, () => IndexPage);
