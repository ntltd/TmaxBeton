import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  private calculator : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    this.calculator = this.formBuilder.group({
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatorPage');
  }

}
