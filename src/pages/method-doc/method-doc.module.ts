import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MethodDocPage } from './method-doc';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MethodDocPage,
  ],
  imports: [
    IonicPageModule.forChild(MethodDocPage),
    TranslateModule
  ],
})
export class MethodDocPageModule {}
