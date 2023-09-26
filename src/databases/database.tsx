import {setRealm} from 'react-native-realm-query';
import Realm from 'realm';
import {VerseSchema} from '@tables/verse.table';
import {CategorySchema} from '@tables/category.table';
import {logE} from 'react-native-error-handling';
import {REACT_APP_DB_VERSION} from '@env';
import RNFS from 'react-native-fs';

////////////////Options
export const DatabaseOptions: Realm.Configuration = {
  path: 'database.realm',
  schema: [CategorySchema, VerseSchema],
  schemaVersion: 1,
};
////////////////Options

let vRealm = new Realm(DatabaseOptions);

export async function databaseConfig() {
  try {
    const destinationFilePath = `${RNFS.DocumentDirectoryPath}/database.realm`;
    const destinationVersionFilePath = `${RNFS.DocumentDirectoryPath}/database.realm.version`;
    const version = parseInt(REACT_APP_DB_VERSION ?? '1', 10);

    const isInstalled = await RNFS.exists(destinationVersionFilePath);
    const installedVersion = isInstalled
      ? await RNFS.readFile(destinationVersionFilePath, 'ascii')
      : 0;

    if (parseInt(installedVersion as string, 10) === version) {
      setRealm(vRealm);
      return Promise.resolve(true);
    }

    // Need to update assets
    // 1. Delete existing assets if isInstalled

    if (await RNFS.exists(destinationFilePath)) {
      vRealm.close();
      await RNFS.unlink(destinationFilePath);
    }

    await RNFS.copyFileAssets('database.realm', destinationFilePath);
    await RNFS.write(destinationVersionFilePath, version.toString());

    vRealm = new Realm(DatabaseOptions);

    setRealm(vRealm);

    return Promise.resolve(true);
  } catch (e) {
    logE('dc', String(e));
  }
  return Promise.reject('error');
}

export default vRealm;

export const getDatabase = () => Realm.open(DatabaseOptions);
