import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';

//TODO: anebale prod mode 'ionic cordova build android/ios/windows --env=prod --release'
import {enableProdMode} from "@angular/core";
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
