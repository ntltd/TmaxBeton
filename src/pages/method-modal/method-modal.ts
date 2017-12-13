import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-method-modal',
  templateUrl: 'method-modal.html',
})
export class MethodModalPage {

  public stepNumber: number;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.stepNumber = navParams.get('step');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
