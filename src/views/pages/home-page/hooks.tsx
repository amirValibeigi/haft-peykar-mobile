import React from 'react';
import CategoryModel from '@models/category.model';
import CategoryRepository from '@repositories/category.repository';
import {useItem} from './item';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllParamList} from '@routes/stack-param-list.type';

export function useCategory() {
  const [categories, setCategories] = React.useState<Array<CategoryModel>>();

  const getCategories = React.useCallback(() => {
    new CategoryRepository()
      .getDB({rows: 99, sortOrder: 'ASC'})
      .then(vCategories => {
        setCategories(vCategories);
      });
  }, []);

  React.useEffect(getCategories, [getCategories]);

  return {categories};
}

export function useUI(
  navigation: StackNavigationProp<AllParamList, 'homePage'>,
) {
  const onPress = React.useCallback(
    (id: number, title: string) => {
      navigation.navigate('versePage', {id, title});
    },
    [navigation],
  );
  const renderItem = useItem({onPress});

  return {
    renderItem,
  };
}
