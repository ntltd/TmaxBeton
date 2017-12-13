import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import {MethodDocPage} from '../method-doc/method-doc';
import {MethodModalPage} from '../method-modal/method-modal';


@IonicPage()
@Component({
  selector: 'page-method',
  templateUrl: 'method.html',
})

export class MethodPage {

  formulae: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.formulae = "`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`";
  }

  pushMethodDocPage() {
    this.navCtrl.push(MethodDocPage, {});
  }

  ionViewDidEnter() {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MethodPage');
  }

  openModal(step: number) {
    let myModal = this.modalCtrl.create(MethodModalPage, {step: step});
    myModal.present();
  }

}
