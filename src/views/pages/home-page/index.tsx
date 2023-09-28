import React from 'react';
import {FlatList, SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import {useCategory, useUI} from './hooks';
import CategoryModel from '@models/category.model';
import {useBottomTabContext} from '@contexts/bottom-tab.context';
import {StackScreenProps} from '@react-navigation/stack';
import {AllParamList} from '@routes/stack-param-list.type';

const HomePage = ({navigation}: StackScreenProps<AllParamList, 'homePage'>) => {
  const {categories} = useCategory();
  const {renderItem} = useUI(navigation);
  const {size} = useBottomTabContext();
  const ccs = React.useMemo<StyleProp<ViewStyle>>(
    () => ({paddingBottom: size + 18}),
    [size],
  );

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={ccs}
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
