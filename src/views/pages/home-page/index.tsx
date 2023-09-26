import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useCategory, useUI} from './hooks';
import CategoryModel from '@models/category.model';

const HomePage = () => {
  const {categories} = useCategory();
  const {renderItem} = useUI();

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

function keyExtractor(item: CategoryModel, index: number) {
  return `${item.id}_${index}`;
}

export default React.memo(HomePage);
