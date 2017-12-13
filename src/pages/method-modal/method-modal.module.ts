import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MethodModalPage } from './method-modal';

@NgModule({
  declarations: [
    MethodModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MethodModalPage),
  ],
})
export class MethodModalPageModule {}
