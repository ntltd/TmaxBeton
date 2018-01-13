import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import {MethodDocPage} from '../method-doc/method-doc';
import {MethodModalPage} from '../method-modal/method-modal';
import {GuideDocPage} from "../guide-doc/guide-doc";


@IonicPage()
@Component({
  selector: 'page-method',
  templateUrl: 'method.html',
})

export class MethodPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  pushMethodDocPage() {
    this.navCtrl.push(MethodDocPage, {});
  }

  pushGuideDocPage() {
    this.navCtrl.push(GuideDocPage, {});
  }

  ionViewDidEnter() {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }

  openModal(step: number) {
    let myModal = this.modalCtrl.create(MethodModalPage, {step: step});
    myModal.present();
  }

}
