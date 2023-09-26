import React from 'react';
import CategoryModel from '@models/category.model';
import CategoryRepository from '@repositories/category.repository';
import {useItem} from './item';

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

export function useUI() {
  const renderItem = useItem();

  return {
    renderItem,
  };
}
