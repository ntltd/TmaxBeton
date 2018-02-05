import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';

import {TmaxBeton} from './app.component';
import {HomePage} from '../pages/home/home';
import {MethodPage} from '../pages/method/method';
import {MethodDocPage} from '../pages/method-doc/method-doc';
import {HistoryPage} from '../pages/history/history';
import {CalculatorPage} from '../pages/calculator/calculator';
import {ResultPage} from '../pages/result/result';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Clipboard} from '@ionic-native/clipboard';
import {MethodModalPage} from "../pages/method-modal/method-modal";
import {GuideDocPage} from "../pages/guide-doc/guide-doc";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TmaxBeton,
    HomePage,
    MethodPage,
    MethodDocPage,
    GuideDocPage,
    HistoryPage,
    CalculatorPage,
    ResultPage,
    MethodModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(TmaxBeton, {
      mode: 'md'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TmaxBeton,
    HomePage,
    MethodPage,
    MethodDocPage,
    GuideDocPage,
    HistoryPage,
    CalculatorPage,
    ResultPage,
    MethodModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
