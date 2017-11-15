import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';

import {HomePage} from '../pages/home/home';
import {MethodPage} from '../pages/method/method';
import {HistoryPage} from '../pages/history/history';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  switchLang: boolean;

  pages: Array<{ title: string, component: any, icon: string, category: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private translateService: TranslateService) {

    this.initializeApp();

    // Set default language to 'fr'
    platform.ready().then(() => {
      translateService.setDefaultLang('fr');
      translateService.use('fr');
      this.switchLang = this.isEnglishTranslation();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: 'HOME_PAGE.TITLE',
        component: HomePage,
        icon: 'calculator',
        category: 'general'
      },
      {
        title: 'METHOD_PAGE.TITLE',
        component: MethodPage,
        icon: 'help-circle',
        category: 'general'
      },
      {
        title: 'HISTORY_PAGE.TITLE',
        component: HistoryPage,
        icon: 'time',
        category: 'general'
      }
    ];

  }

  segmentChanged(event) {
    this.translateService.use(event._value);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (page.type) {
      case 'page':
        this.nav.setRoot(page.component);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }

  isEnglishTranslation():boolean{
    return this.translateService.getDefaultLang() == 'en';
  }

  translateApp() {
    let currentLanguage = this.translateService.getDefaultLang(), setLanguage;
    switch (currentLanguage) {
      case 'fr':
        setLanguage = 'en';
        break;
      case 'en':
        setLanguage = 'fr';
        break;
      default:
        setLanguage = 'en';
        break;
    }
    this.translateService.setDefaultLang(setLanguage);
    this.translateService.use(setLanguage);
  }
}
