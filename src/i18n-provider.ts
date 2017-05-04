import {APP_BASE_HREF} from '@angular/common';
import {CompilerOptions, LOCALE_ID, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {Observable} from 'rxjs/Rx';

/**
 * Returns the current lang for the application
 * using the existing base path
 * or the browser lang if there is no base path
 * @returns {string}
 */
export function getLang(): string|null {
  if (typeof window === 'undefined' ||
      typeof window.navigator === 'undefined') {
    return null;
  }

  const basePath = window.location.pathname.replace('/', '').split('/');
  let lang: string = basePath.length ? basePath[0] : '';

  if (!lang) {
    lang =
        window.navigator['languages'] ? window.navigator['languages'][0] : null;
    lang = lang || window.navigator.language ||
        window.navigator['browserLanguage'] || window.navigator['userLanguage'];
  }

  if (lang.indexOf('-') !== -1) {
    lang = lang.split('-')[1];
  }

  if (lang.indexOf('_') !== -1) {
    lang = lang.split('_')[1];
  }

  return lang ? lang : 'us';
}

export function getTranslationProviders(): Promise<CompilerOptions[]> {
  const locale = getLang();
  const PROVIDERS = [{provide: LOCALE_ID, useValue: locale}];

  if (locale) {
    document.querySelector('base').href = `/${locale}`;
    PROVIDERS.push({provide: APP_BASE_HREF, useValue: `/${locale}`});
  }

  if (locale === 'en') {
    return Promise.resolve(PROVIDERS);
  }

  return getTranslationsWithSystemJs(locale)
      .then(
          (translations: string) =>
              [{provide: TRANSLATIONS, useValue: translations},
               {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
               ...PROVIDERS])
      .catch(() => PROVIDERS);  // ignore if file not found
}

function getTranslationsWithSystemJs(locale: string) {
  return System.import(
      `raw-loader!./locale/messages.${locale}.xlf`);  // relies on text plugin
}
