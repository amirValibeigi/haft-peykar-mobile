import React from 'react';
import VerseModel from '@models/category.model';
import VerseRepository from '@repositories/verse.repository';
import {useItem} from './item';
import {useAppBarContext} from '@contexts/app-bar.context';

export function useVerse(categoryId?: number) {
  const [verses, setVerses] = React.useState<Array<VerseModel>>();

  const getVerses = React.useCallback(() => {
    new VerseRepository()
      .getDB({
        filters: {
          'verses-category_id': [categoryId],
        },
        accurate: true,
        rows: 10000,
        sortOrder: 'ASC',
      })
      .then(vVerses => {
        setVerses(vVerses);
      });
  }, [categoryId]);

  React.useEffect(getVerses, [getVerses]);

  return {verses};
}

export function useUI(title?: string) {
  const onPress = React.useCallback((id: number) => {
    console.log(id);
  }, []);
  const renderItem = useItem({onPress});
  const {setConfigAppBar} = useAppBarContext();

  React.useEffect(() => {
    if (title) {
      setConfigAppBar({title});
    }
  }, [setConfigAppBar, title]);

  return {
    renderItem,
  };
}
