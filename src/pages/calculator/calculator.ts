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
      select_CEM: ['', Validators.required],
      field_TLIM: ['', Validators.required],
      field_C: ['', Validators.required],
      field_FS: ['', Validators.required],
      field_MK: ['', Validators.required],
      field_AS: ['', Validators.required],
      field_CV: ['', Validators.required],
      field_LA: ['', Validators.required],
      field_MV: ['', Validators.required],
      field_EEFF: ['', Validators.required],
      field_RC2: ['', Validators.required],
      field_RC28: ['', Validators.required],
      field_Q120: ['0', Validators.required],
      field_Q41: ['', Validators.required],
      field_EP: ['', Validators.required],
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

  degagementChaleurInfini(Q120: number, Q41: number, RC2: number, RC28: number, CEMType: string) {
    let Qm;
    if (Q120 == 0 || !Q120) {
      Qm = Math.max(Q41, Q41 * (1.71 - 1.16 * (RC2 / RC28)));
    }
    else if (CEMType == 'CEM I' || CEMType == 'CEM II') {
      Qm = 1.05 * Q120;
    }
    else {
      Qm = 1.15 * Q120;
    }
    return Qm;
  }

  liantEquivalentChaleur(Fs: number, Mk: number, As: number, Cv: number, La: number, C: number, Ep: number) {
    let res, K;
    if (Fs && Mk && As && Cv && La == 0) {
      return C;
    }
    res = C + Fs + Mk + 0 * As + 1.12 * (1 - Math.exp(-Ep / 3)) * La;
    if (Cv != 0) {
      if (Ep <= 1) {
        K = 0;
      }
      else if (1 < Ep && Ep <= 5) {
        K = -0.0357 * (Ep ** 2) + 0.4143 * Ep - 0.38;
      }
      else if (Ep >= 5) {
        K = 0.8;
      }
      res += K * Cv;
    }
    return res;
  }
}
