import React from 'react';
import {ListRenderItemInfo, Text, TouchableOpacity} from 'react-native';
import CategoryModel from '@models/category.model';
import {styles} from './item.styles';

export const Item = React.memo(({item}: ListRenderItemInfo<CategoryModel>) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
});

export function useItem() {
  return React.useCallback(
    (props: ListRenderItemInfo<CategoryModel>) => <Item {...props} />,
    [],
  );
}
