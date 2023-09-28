import React from 'react';
import {ListRenderItemInfo, Text, TouchableOpacity} from 'react-native';
import CategoryModel from '@models/category.model';
import {styles} from './item.styles';

export interface ItemAccess {
  onPress?: (id: number) => void;
}

export const Item = React.memo(
  ({item, index, onPress}: ListRenderItemInfo<CategoryModel> & ItemAccess) => {
    const vStyles = React.useMemo(
      () => ({
        container: [
          styles.container,
          index % 2 !== 0 && styles.containerBottomSpace,
        ],
        title: [styles.title, index % 2 !== 0 && styles.titleLeft],
      }),
      [index],
    );

    return (
      <TouchableOpacity
        style={vStyles.container}
        onPress={onPress?.bind(null, item.id ?? -1)}>
        <Text style={vStyles.title}>{item.title}</Text>
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
