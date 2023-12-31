import React from 'react';
import {ListRenderItemInfo, Text, TouchableOpacity} from 'react-native';
import CategoryModel from '@models/category.model';
import {styles} from './item.styles';

export interface ItemAccess {
  onPress?: (id: number, title: string) => void;
}

export const Item = React.memo(
  ({item, onPress}: ListRenderItemInfo<CategoryModel> & ItemAccess) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress?.bind(null, item.id ?? -1, item.title)}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

export function useItem(access: ItemAccess) {
  return React.useCallback(
    (props: ListRenderItemInfo<CategoryModel>) => (
      <Item {...props} {...access} />
    ),
    [access],
  );
}
