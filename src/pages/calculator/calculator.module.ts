import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculatorPage } from './calculator';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculatorPage),
    TranslateModule
  ],
})
export class CalculatorPageModule {}
