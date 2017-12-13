import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';

import {HomePage} from '../pages/home/home';
import {MethodPage} from '../pages/method/method';
import {HistoryPage} from '../pages/history/history';
import {CalculatorPage} from '../pages/calculator/calculator';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CalculatorPage;
  activePage: any;
  switchLang: boolean = false;

  pages: Array<{ title: string, component: any, icon: string, category: string, selected: boolean }>;

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
        title: 'CALCULATOR_PAGE.TITLE',
        component: CalculatorPage,
        icon: 'calculator',
        category: 'general',
        selected: false
      },
      {
        title: 'METHOD_PAGE.TITLE',
        component: MethodPage,
        icon: 'cog',
        category: 'general',
        selected: false
      },
      {
        title: 'HISTORY_PAGE.TITLE',
        component: HistoryPage,
        icon: 'time',
        category: 'general',
        selected: false
      },
      {
        title: 'HOME_PAGE.TITLE',
        component: HomePage,
        icon: 'information-circle',
        category: 'general',
        selected: false
      }
    ];
    // Set active page = root page at start
    this.activePage = this.pages[0];
  }

  segmentChanged(event) {
    this.translateService.use(event._value);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkActivePage(page) {
    return page == this.activePage;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  isEnglishTranslation(): boolean {
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
