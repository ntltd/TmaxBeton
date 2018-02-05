import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredentialsPage } from './credentials';

@NgModule({
  declarations: [
    CredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(CredentialsPage),
  ],
})
export class CredentialsPageModule {}
