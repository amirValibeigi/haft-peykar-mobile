import {I18n} from 'i18n-js';
import {REACT_APP_DEFAULT_LANGUAGE} from '@env';

export type OptionType = {
  locale?: string;
};

const translationGetters = {
  fa: require('@locales/fa.json'),
  en: require('@locales/en.json'),
};

const i18n = new I18n(translationGetters, {
  availableLocales: ['fa', 'en'],
  defaultLocale: 'fa',
  locale: 'fa',
});

export const setI18nConfig = () => {
  i18n.locale = REACT_APP_DEFAULT_LANGUAGE;
  i18n.translations = translationGetters;
};

export const changeLanguage = (languageKey: 'fa' | 'en') => {
  const lastLocale = i18n.locale;
  i18n.locale = languageKey;

  return lastLocale;
};

/**
 *
 * translate multi
 * @param {Array<String>} key app_name,username
 * @param {String} pattern {0}_{1}
 * @returns {String} String
 */
export const multiTranslate = (key: Array<string>, pattern?: string) => {
  let str = pattern ?? '';

  let pos = 0;

  if (pattern !== undefined && pattern.length > 0) {
    let indexStart;
    do {
      indexStart = str.indexOf('{', pos);
      const indexEnd = str.indexOf('}', indexStart);
      if (indexEnd === -1 || indexStart + 4 < indexEnd) {
        throw new Error('not found End {}');
      }

      const tmp = str.substr(indexStart + 1, indexEnd - indexStart - 1);
      const indexPath = Number(tmp);

      if (indexPath > pattern.length) {
        throw new Error(`not found {${indexPath}}`);
      }

      str = str.replace(`{${tmp}}`, i18n.t(key[indexPath]));

      pos = indexEnd;
    } while (indexStart !== -1);
  } else {
    key?.forEach(v => {
      str += i18n.t(v) + ' ';
    });
  }

  return str;
};

export const getString = (
  key: string,
  ...values: Array<string | number | OptionType>
) => {
  const indexO = values.findIndex(v => (v as OptionType)?.locale);
  const option = indexO >= 0 ? values.splice(indexO, 1)?.[0] : undefined;
  let lastLocale;

  if ((option as OptionType)?.locale) {
    lastLocale = changeLanguage((option as OptionType)!.locale as any);
  }

  let str = i18n.t(key);

  (values as Array<string>)?.forEach((v, i) => {
    str = str.replace(`{${i}}`, v);
  });

  if (lastLocale) {
    changeLanguage(lastLocale as any);
  }

  return str;
};

export default getString;
