import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';

import {TmaxBeton} from './app.component';

import {CalculatorPage} from '../pages/calculator/calculator';
import {GuideDocPage} from "../pages/guide-doc/guide-doc";
import {HistoryPage} from '../pages/history/history';
import {CredentialsPage} from '../pages/credentials/credentials';
import {MethodPage} from '../pages/method/method';
import {MethodDocPage} from '../pages/method-doc/method-doc';
import {MethodModalPage} from "../pages/method-modal/method-modal";
import {ResultPage} from '../pages/result/result';

import {CalculatorPageModule} from "../pages/calculator/calculator.module";
import {GuideDocPageModule} from "../pages/guide-doc/guide-doc.module";
import {HistoryPageModule} from "../pages/history/history.module";
import {CredentialsPageModule} from "../pages/credentials/credentials.module";
import {MethodPageModule} from "../pages/method/method.module";
import {MethodDocPageModule} from "../pages/method-doc/method-doc.module";
import {MethodModalPageModule} from "../pages/method-modal/method-modal.module";
import {ResultPageModule} from "../pages/result/result.module";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Clipboard} from '@ionic-native/clipboard';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TmaxBeton,

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
    IonicStorageModule.forRoot(),
    CalculatorPageModule,
    GuideDocPageModule,
    HistoryPageModule,
    CredentialsPageModule,
    MethodPageModule,
    MethodDocPageModule,
    MethodModalPageModule,
    ResultPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TmaxBeton,
    CalculatorPage,
    GuideDocPage,
    HistoryPage,
    CredentialsPage,
    MethodPage,
    MethodDocPage,
    MethodModalPage,
    ResultPage
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
