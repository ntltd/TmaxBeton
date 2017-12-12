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
  public Qm: number;
  public LEch: number;
  public coefReduc: number;
  public deltaT: number;
  public TMax: number;
  public inputVariables: any = {
    "CEM": "-", "TLIM": "-", "C": "-", "FS": "-",
    "MK": "-", "AS": "-", "CV": "-", "LA": "-",
    "MV": "-", "EEFF": "-", "RC2": "-", "RC28": "-",
    "Q120": "-", "Q41": "-", "EP": "-"
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {

    this.calculator = this.formBuilder.group({
      select_CEM: ['', Validators.required],
      field_TLIM: ['', Validators.required],
      field_C: ['', Validators.required],
      field_FS: [''],
      field_MK: [''],
      field_AS: [''],
      field_CV: [''],
      field_LA: [''],
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
  calculate() {
    this.inputVariables.CEM = !this.calculator.value.select_CEM;
    this.inputVariables.TLIM = !this.calculator.value.field_TLIM;
    this.inputVariables.C = !this.calculator.value.field_C;
    this.inputVariables.FS = !this.calculator.value.field_FS;
    this.inputVariables.MK = !this.calculator.value.field_MK;
    this.inputVariables.AS = !this.calculator.value.field_AS;
    this.inputVariables.CV = !this.calculator.value.field_CV;
    this.inputVariables.LA = !this.calculator.value.field_LA;
    this.inputVariables.MV = !this.calculator.value.field_MV;
    this.inputVariables.EEFF = !this.calculator.value.field_EEFF;
    this.inputVariables.RC2 = !this.calculator.value.field_RC2;
    this.inputVariables.RC28 = !this.calculator.value.field_RC28;
    this.inputVariables.Q120 = !this.calculator.value.field_Q120;
    this.inputVariables.Q41 = !this.calculator.value.field_Q41;
    this.inputVariables.EP = !this.calculator.value.field_EP;

    console.log(this.inputVariables);
  }

  // Estimation du dégagement de chaleur à l’infini pour le ciment retenu (Qm)
  degagementChaleurInfini(Q120: number, Q41: number, RC2: number, RC28: number, CEMType: number) {
    let Qm;
    if (Q120 == 0 || !Q120) {
      Qm = Math.max(Q41, Q41 * (1.71 - 1.16 * (RC2 / RC28)));
    }
    else if (CEMType == 1 || CEMType == 2) {
      Qm = 1.05 * Q120;
    }
    else {
      Qm = 1.15 * Q120;
    }
    this.Qm = Qm;
    return Qm;
  }

  // Calcul du liant équivalent chaleur (LEch)
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
    res = Math.round(res * 100) / 100;
    this.LEch = res;
    console.log("Liant équivalent chaleur LEch (en kg/m3) calculé :", this.LEch);
  }

  calculFinal(EEff: number, Mv, Ep, TLim, Q41) {
    let R, alpha, deltaTadia, deltaT, Tini_max;
    // Prise en compte de l’impact du rapport Eeff/Liant eq. :
    alpha = 1.29 * (1 - Math.exp(-3.3 * (EEff / this.LEch)))
    // Estimation de l’élévation de température en l’absence de déperditions thermiques :
    deltaTadia = alpha * (this.Qm * this.LEch) / Mv;
    // Prise en compte des déperditions thermiques
    if (Ep >= 5) {
      R = 1
    }
    else {
      R = Math.min(1, 1 / (1 + ((Math.max(0.3, -0.0057 * Q41 + 2.0558)) / Ep) ** 1.5));
    }
    R = Math.round(R * 100) / 100;
    this.coefReduc = R;
    console.log("Coefficient de réduction R : ", this.coefReduc);
    // l’élévation de température ΔT :
    deltaT = Math.round(R * deltaTadia);
    this.deltaT = deltaT;
    console.log("∆T = ", this.deltaT);
    // Estimation de la valeur maximale possible pour la température initiale du béton frais au moment du coulage
    Tini_max = TLim - deltaT;
    this.TMax = Math.round(Tini_max);
    console.log("Valeur maximale possible pour la température :", this.TMax);
  }
}
