import {setRealm} from 'react-native-realm-query';
import Realm from 'realm';

////////////////Options
export const DatabaseOptions: Realm.Configuration = {
  path: 'database.realm',
  schema: [],
  schemaVersion: 1,
};
////////////////Options

const vRealm = new Realm(DatabaseOptions);

setRealm(vRealm);

export default vRealm;
export const getDatabase = () => Realm.open(DatabaseOptions);
