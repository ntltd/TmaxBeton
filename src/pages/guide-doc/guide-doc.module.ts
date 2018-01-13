import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideDocPage } from './guide-doc';

@NgModule({
  declarations: [
    GuideDocPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideDocPage),
  ],
})
export class GuideDocPageModule {}
