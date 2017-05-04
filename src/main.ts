import {CompilerOptions, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {getTranslationProviders} from 'i18n-provider';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule);
getTranslationProviders().then((providers: CompilerOptions[]) => {
  const options = {providers};
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});
