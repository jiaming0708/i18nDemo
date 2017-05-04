import {Component, Inject, LOCALE_ID} from '@angular/core';
import {getLang} from 'i18n-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locale: string;

  constructor(@Inject(LOCALE_ID) localeID: string) {
    this.locale = localeID.match(/^(us|tw)$/) ? localeID : getLang();
  }

  changeLocale(event: string) {
    window.location.href = `/${event}/`;
  }
}
