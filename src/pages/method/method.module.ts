import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MethodPage } from './method';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MethodPage,
  ],
  imports: [
    IonicPageModule.forChild(MethodPage),
    TranslateModule
  ],
})
export class MethodPageModule {}
