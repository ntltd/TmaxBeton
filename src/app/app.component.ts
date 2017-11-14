import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {MethodPage} from '../pages/method/method';
import {HistoryPage} from '../pages/history/history';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string, category: string, type: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: 'Accueil',
        component: HomePage,
        icon: 'calculator',
        category: 'general',
        type: 'page'
      },
      {
        title: 'Méthode',
        component: MethodPage,
        icon: 'help-circle',
        category: 'general',
        type: 'page'
      },
      {
        title: 'Historique',
        component: HistoryPage,
        icon: 'time',
        category: 'general',
        type: 'page'
      },
      {
        title: 'Langue',
        component: null,
        icon: 'flag',
        category: 'other',
        type: 'link'
      },
    ];

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
      case 'link':
        console.log('Change Language');
        break;
      case 'page':
        this.nav.setRoot(page.component);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }
}
