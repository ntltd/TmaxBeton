import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GuideDocPage} from "../guide-doc/guide-doc";

@Component({
  selector: 'page-credentials',
  templateUrl: 'credentials.html'
})
export class CredentialsPage {

  constructor(public navCtrl: NavController) {

  }

  pushGuideDocPage() {
    this.navCtrl.push(GuideDocPage, {});
  }

}
