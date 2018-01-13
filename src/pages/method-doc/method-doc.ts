import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-method-doc',
  templateUrl: 'method-doc.html',
})
export class MethodDocPage {

  public annexePages = ["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011", "0012"];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

}
