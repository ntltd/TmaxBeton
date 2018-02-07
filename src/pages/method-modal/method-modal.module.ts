import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MethodModalPage } from './method-modal';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MethodModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MethodModalPage),
    TranslateModule
  ],
})
export class MethodModalPageModule {}
