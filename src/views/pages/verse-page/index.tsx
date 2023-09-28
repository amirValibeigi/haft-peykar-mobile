import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AllParamList} from '@routes/stack-param-list.type';
import {useUI, useVerse} from './hooks';
import VerseModel from '@models/verse.model';

const VersePage = React.memo(
  ({route}: StackScreenProps<AllParamList, 'versePage'>) => {
    const {id, title} = route.params ?? {};
    const {verses} = useVerse(id);
    const {renderItem} = useUI(title);

    return (
      <SafeAreaView>
        <FlatList
          data={verses}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    );
  },
);

function keyExtractor(item: VerseModel, index: number) {
  return `${item.id}_${index}`;
}

export default VersePage;
