import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-method',
  templateUrl: 'method.html',
})

export class MethodPage {

  formulae: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formulae="`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`";
  }

  ionViewDidEnter() {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MethodPage');
  }

}
