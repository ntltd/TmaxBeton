import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideDocPage } from './guide-doc';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GuideDocPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideDocPage),
    TranslateModule
  ],
})
export class GuideDocPageModule {}
