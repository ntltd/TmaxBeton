import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';

import {ResultPage} from '../result/result';

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  private calculator: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {

    this.calculator = this.formBuilder.group({
      select_1: ['', Validators.required],
      field_1: ['', Validators.required],
      field_2: ['', Validators.required],
      field_3: ['', Validators.required],
      field_4: ['', Validators.required],
      field_5: ['', Validators.required],
      field_6: ['', Validators.required],
      field_7: ['', Validators.required],
      field_8: ['', Validators.required],
      field_9: ['', Validators.required],
    });

  }

  //TODO: store result to storage
  storeResult() {
    this.storage.set('name', 'Max');
  }

  pushToResultPage(parameters: any) {
    this.navCtrl.push(ResultPage, {
      //params: parameters
    });
  }

  //TODO: calculate function
  calculate(fields: any) {

  }
}
