import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredentialsPage } from './credentials';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(CredentialsPage),
    TranslateModule
  ],
})
export class CredentialsPageModule {}
