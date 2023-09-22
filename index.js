/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import IndexPage from '@pages/IndexPage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => IndexPage);
