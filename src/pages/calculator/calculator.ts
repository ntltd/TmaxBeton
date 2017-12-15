import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';

import {ResultPage} from '../result/result';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  private calculator: FormGroup;
  public isAdditions = false;
  public Qm: number;
  public LEch: number;
  public coefReduc: number;
  public deltaT: number;
  public TMax: number;
  public currentTime: any;
  public inputVariables: any = {
    "CEM": 0, "TLIM": 0, "C": 0, "FS": 0,
    "MK": 0, "AS": 0, "CV": 0, "LA": 0,
    "MV": 0, "EEFF": 0, "RC2": 0, "RC28": 0,
    "Q120": 0, "Q41": 0, "EP": 0
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {

    let expRegWithoutZero = '(?!^0*$)(?!^0*\\.0*$)^\\d{1,5}(\\.\\d{1,2})?$';
    let expRegWithZero = '^\\d{1,5}(\\.\\d{1,2})?$';

    this.calculator = this.formBuilder.group({
      select_CEM: ["0", [Validators.required, Validators.pattern('[1-4]')]],
      field_TLIM: [65, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_C: [350, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_FS: [0, Validators.pattern(expRegWithZero)],
      field_MK: [0, Validators.pattern(expRegWithZero)],
      field_AS: [0, Validators.pattern(expRegWithZero)],
      field_CV: [0, Validators.pattern(expRegWithZero)],
      field_LA: [0, Validators.pattern(expRegWithZero)],
      field_MV: [2400, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_EEFF: [175, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_RC2: [27, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_RC28: [68, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_Q120: [0, [Validators.required, Validators.pattern(expRegWithZero)]],
      field_Q41: [306, [Validators.required, Validators.pattern(expRegWithoutZero)]],
      field_EP: [1, [Validators.required, Validators.pattern(expRegWithoutZero)]],
    });
  }

  displayAdditions() {
    this.isAdditions = !this.isAdditions;
  }

  //TODO: store result to storage
  storeResult() {
    this.storage.set('name', 'Max');
  }

  pushToResultPage() {
    this.navCtrl.push(ResultPage, {
      currentTime: this.currentTime,
      Qm: this.Qm,
      LEch: this.LEch,
      coefReduc: this.coefReduc,
      deltaT: this.deltaT,
      TMax: this.TMax,
      inputVariables: this.inputVariables
    });
  }

  calculate() {
    if (this.calculator.value.select_CEM != "")
      this.inputVariables.CEM = this.calculator.value.select_CEM;
    if (this.calculator.value.field_TLIM != "")
      this.inputVariables.TLIM = this.calculator.value.field_TLIM;
    if (this.calculator.value.field_C != "")
      this.inputVariables.C = this.calculator.value.field_C;
    if (this.calculator.value.field_FS != "")
      this.inputVariables.FS = this.calculator.value.field_FS;
    if (this.calculator.value.field_MK != "")
      this.inputVariables.MK = this.calculator.value.field_MK;
    if (this.calculator.value.field_AS != "")
      this.inputVariables.AS = this.calculator.value.field_AS;
    if (this.calculator.value.field_CV != "")
      this.inputVariables.CV = this.calculator.value.field_CV;
    if (this.calculator.value.field_LA != "")
      this.inputVariables.LA = this.calculator.value.field_LA;
    if (this.calculator.value.field_MV != "")
      this.inputVariables.MV = this.calculator.value.field_MV;
    if (this.calculator.value.field_EEFF != "")
      this.inputVariables.EEFF = this.calculator.value.field_EEFF;
    if (this.calculator.value.field_RC2 != "")
      this.inputVariables.RC2 = this.calculator.value.field_RC2;
    if (this.calculator.value.field_RC28 != "")
      this.inputVariables.RC28 = this.calculator.value.field_RC28;
    if (this.calculator.value.field_Q120 != "")
      this.inputVariables.Q120 = this.calculator.value.field_Q120;
    if (this.calculator.value.field_Q41 != "")
      this.inputVariables.Q41 = this.calculator.value.field_Q41;
    if (this.calculator.value.field_EP != "")
      this.inputVariables.EP = this.calculator.value.field_EP;

    this.degagementChaleurInfini(this.inputVariables.Q120,
      this.inputVariables.Q41,
      this.inputVariables.RC2,
      this.inputVariables.RC28,
      this.inputVariables.CEM);
    this.liantEquivalentChaleur(this.inputVariables.FS,
      this.inputVariables.MK,
      this.inputVariables.AS,
      this.inputVariables.CV,
      this.inputVariables.LA,
      this.inputVariables.C,
      this.inputVariables.EP
    );
    this.calculFinal(this.inputVariables.EEFF,
      this.inputVariables.MV,
      this.inputVariables.EP,
      this.inputVariables.TLIM,
      this.inputVariables.Q41
    );

    this.currentTime = moment();

    this.pushToResultPage();
  }

  // Estimation du dégagement de chaleur à l’infini pour le ciment retenu (Qm)
  degagementChaleurInfini(Q120: number, Q41: number, RC2: number, RC28: number, CEMType: string) {
    let Qm;
    if (Q120 == 0 || !Q120) {
      Qm = Math.max(Q41, Q41 * (1.71 - 1.16 * (RC2 / RC28)));
    }
    else if (CEMType == "1" || CEMType == "2") {
      Qm = 1.05 * Q120;
    }
    else {
      Qm = 1.15 * Q120;
    }
    console.log("Qm:", Qm);
    this.Qm = Qm;
    //return Qm;
  }

  // Calcul du liant équivalent chaleur (LEch)
  liantEquivalentChaleur(Fs, Mk, As, Cv, La, C, Ep) {
    let res, K;
    if (Fs == 0 && Mk == 0 && As == 0 && Cv == 0 && La == 0) {
      res = C;
    }
    else {
      // noinspection PointlessArithmeticExpressionJS
      res = C + Fs + Mk + 0 * As + 1.12 * (1 - Math.exp(-Ep / 3)) * La;
      if (Cv != 0) {
        if (Ep <= 1) {
          K = 0;
        }
        else if (1 < Ep && Ep <= 5) {
          K = -0.0357 * (Math.pow(Ep, 2)) + 0.4143 * Ep - 0.38;
        }
        else if (Ep > 5) {
          K = 0.8;
        }
        res += K * Cv;
      }
    }
    res = Math.round(res * 100) / 100;
    this.LEch = res;
    console.log("Lech:", this.LEch);
  }

  calculFinal(EEff, Mv, Ep, TLim, Q41) {
    let R, alpha, deltaTadia, deltaT, Tini_max, Cth = 1;
    // Prise en compte de l’impact du rapport Eeff/Liant eq. :
    alpha = 1.29 * (1 - Math.exp(-3.3 * (EEff / this.LEch)));
    console.log("Alpha:", alpha);
    // Estimation de l’élévation de température en l’absence de déperditions thermiques :
    deltaTadia = alpha * (this.Qm * this.LEch) / (Mv * Cth);
    console.log("deltaTadia:", deltaTadia);
    if (Ep >= 5) {
      R = 1;
    }
    else {
      // Prise en compte des déperditions thermiques
      R = Math.min(1, (1 / (1 + Math.pow(((Math.max(0.3, -0.0057 * Q41 + 2.0558)) / Ep), 1.5))));
    }
    this.coefReduc = R;
    console.log("R:", this.coefReduc);
    // l’élévation de température ΔT :
    deltaT = R * deltaTadia;
    this.deltaT = deltaT;
    console.log("∆T = ", this.deltaT);
    // Estimation de la valeur maximale possible pour la température initiale du béton frais au moment du coulage
    Tini_max = TLim - deltaT;
    console.log("Tmax:", Tini_max);
    this.TMax = Tini_max;
  }
}
