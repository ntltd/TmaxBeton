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
  public inputVariables= {
    "CEM": "0", "TLIM": null, "C": null, "FS": null,
    "MK": null, "AS": null, "CV": null, "LA": null,
    "MV": null, "EEFF": null, "RC2": null, "RC28": null,
    "Q120": null, "Q41": null, "EP": null
  };
  public expRegWithoutZero = '(?!^0*$)(?!^0*\\.0*$)^\\d{1,5}(\\.\\d{1,2})?$';
  public expRegWithZero = '^\\d{1,5}(\\.\\d{1,2})?$';


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {

    this.createFormBuilder();

    this.getInputs();
  }

  createFormBuilder() {
    this.calculator = this.formBuilder.group({
      select_CEM: [this.inputVariables.CEM, [Validators.required, Validators.pattern('[1-4]')]],
      field_TLIM: [this.inputVariables.TLIM, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_C: [this.inputVariables.C, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_FS: [this.inputVariables.FS, Validators.pattern(this.expRegWithZero)],
      field_MK: [this.inputVariables.MK, Validators.pattern(this.expRegWithZero)],
      field_AS: [this.inputVariables.AS, Validators.pattern(this.expRegWithZero)],
      field_CV: [this.inputVariables.CV, Validators.pattern(this.expRegWithZero)],
      field_LA: [this.inputVariables.LA, Validators.pattern(this.expRegWithZero)],
      field_MV: [this.inputVariables.MV, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_EEFF: [this.inputVariables.EEFF, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_RC2: [this.inputVariables.RC2, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_RC28: [this.inputVariables.RC28, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_Q120: [this.inputVariables.Q120, [Validators.required, Validators.pattern(this.expRegWithZero)]],
      field_Q41: [this.inputVariables.Q41, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      field_EP: [this.inputVariables.EP, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
    });
  }

  displayAdditions() {
    this.isAdditions = !this.isAdditions;
  }

  getInputs() {
    this.storage.get('inputs').then((inputs) => {
      if (!(!inputs || inputs === null)) {
        this.inputVariables = inputs;
        console.log("inputs:", this.inputVariables);
        this.createFormBuilder();
      }
    });
  }

  storeInputs(currentInputs) {
    this.storage.set('inputs', currentInputs.data.inputVariables);
  }

  storeResult() {

    let currentResult = {
      'currentTime': this.currentTime.format(),
      'data': {
        'Qm': this.Qm,
        'LEch': this.LEch,
        'coefReduc': this.coefReduc,
        'deltaT': this.deltaT,
        'TMax': this.TMax,
        'inputVariables': this.inputVariables
      }
    };

    this.storeInputs(currentResult);

    this.storage.get('results').then((val) => {
      if (!val || val === null) {
        console.log('Pas de résultats précédemment enregistrés');
        this.storage.set('results', new Array(currentResult));
      }
      else {
        console.log('Résultats trouvés', val);
        let results = val;
        if (val.length < 10) {
          results.push(currentResult);
          this.storage.set('results', results);
        }
        else {
          let times = [
            results[0].currentTime,
            results[1].currentTime,
            results[2].currentTime,
            results[3].currentTime,
            results[4].currentTime,
            results[5].currentTime,
            results[6].currentTime,
            results[7].currentTime,
            results[8].currentTime,
            results[9].currentTime
          ];
          let oldestMoment = moment(times[0]);
          for (let i = 0; i < times.length; i++) {
            oldestMoment = moment.min(oldestMoment, moment(times[i]));
          }
          console.log("oldestMoment:", oldestMoment);
          let position = times.indexOf(oldestMoment.format());
          console.log("position:", position);
          results[position] = currentResult;
          this.storage.set('results', results);
        }
      }
    });
  }

  pushToResultPage() {
    this.storeResult();

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
      console.log('1');
    }
    else {
      console.log('2');

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
        console.log('K:', K);
        res = res + (K * Cv);
      }
    }
    //res = Math.round(res * 100) / 100;
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
