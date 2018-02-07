import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Storage} from '@ionic/storage';

import {ResultPage} from '../result/result';

import moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

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
  public inputVariables = {
    "CEM": "0", "TLIM": null, "C": null, "FS": null,
    "MK": null, "AS": null, "CV": null, "LA": null,
    "MV": null, "EEFF": null, "RC2": null, "RC28": null,
    "Q120": null, "Q41": null, "EP": null
  };
  public expRegWithoutZero = '(?!^0*$)(?!^0*\\.0*$)^\\d{1,5}(\\.\\d{1,2})?$';
  public expRegWithZero = '^\\d{1,5}(\\.\\d{1,2})?$';


  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private translateService: TranslateService,
              private alertCtrl: AlertController) {

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
        field_Q41: [this.inputVariables.Q41, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
        field_Q120: [this.inputVariables.Q120, Validators.pattern(this.expRegWithoutZero)],
        field_EP: [this.inputVariables.EP, [Validators.required, Validators.pattern(this.expRegWithoutZero)]],
      },
      {validator: this.checkIfQ120SupQ41}
    );
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
      else {
        this.inputVariables.MV = 2400;
        this.inputVariables.AS = 0;
        this.inputVariables.CV = 0;
        this.inputVariables.LA = 0;
        this.inputVariables.MK = 0;
        this.inputVariables.FS = 0;
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
    else {
      this.inputVariables.Q120 = "";
    }
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

    if (Number(this.TMax) < 0){
      this.presentErrorAlert('wrong');
    }
    else if (isNaN(Number(this.TMax))){
      this.presentErrorAlert('maths');
    }
    else {
      this.pushToResultPage();
    }
  }

  // Estimation du dégagement de chaleur à l’infini pour le ciment retenu (Qm)
  degagementChaleurInfini(Q120: string, Q41: number, RC2: number, RC28: number, CEMType: string) {
    let Qm: number;
    if (Q120 == "" || !Q120) {
      Qm = Math.max(Q41, Q41 * (1.71 - 1.16 * (RC2 / RC28)));
    }
    else if (CEMType == "1" || CEMType == "2") {
      Qm = 1.05 * Number(Q120);
    }
    else {
      Qm = 1.15 * Number(Q120);
    }
    console.log("Qm:", Qm);
    this.Qm = Qm;
    //return Qm;
  }

  // Calcul du liant équivalent chaleur (LEch)
  liantEquivalentChaleur(Fs: number, Mk: number, As: number, Cv: number, La: number, C: number, Ep: number) {
    let res: number, K: number;
    if (Fs == 0 && Mk == 0 && As == 0 && Cv == 0 && La == 0) {
      res = Number(C);
      console.log("Pas d'additions");
    }
    else {
      console.log('Additions');

      // noinspection PointlessArithmeticExpressionJS
      res = Number(C) + Number(Fs) + Number(Mk) + 0 * Number(As) + 1.12 * (1 - Math.exp(-Number(Ep) / 3)) * Number(La);
      if (Cv != 0) {
        if (Ep <= 1) {
          K = 0;
        }
        else if (1 < Ep && Ep <= 5) {
          K = -0.0357 * (Math.pow(Number(Ep), 2)) + 0.4143 * Number(Ep) - 0.38;
        }
        else if (Ep > 5) {
          K = 0.8;
        }
        console.log('K:', K);
        console.log("C:", C);
        console.log("Cv:", Cv);
        res = Number(C) + Number(K * Cv);
      }
    }
    this.LEch = res;
    console.log("Lech:", this.LEch);
  }

  calculFinal(EEff: number, Mv: number, Ep: number, TLim: number, Q41: number) {
    let R: number, alpha: number, deltaTadia: number, deltaT: number, Tini_max: number, Cth: number = 1;
    // Prise en compte de l’impact du rapport Eeff/Liant eq. :
    alpha = 1.29 * (1 - Math.exp(-3.3 * (Number(EEff) / Number(this.LEch))));
    console.log("Alpha:", alpha);
    // Estimation de l’élévation de température en l’absence de déperditions thermiques :
    deltaTadia = Number(alpha) * (Number(this.Qm) * Number(this.LEch)) / (Number(Mv) * Number(Cth));
    console.log("deltaTadia:", deltaTadia);
    if (Ep >= 5) {
      R = 1;
    }
    else {
      // Prise en compte des déperditions thermiques
      R = Math.min(1, (1 / (1 + Math.pow(((Math.max(0.3, -0.0057 * Number(Q41) + 2.0558)) / Number(Ep)), 1.5))));
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

  checkIfQ120SupQ41(g: FormGroup) {
    if (g.get('field_Q120').value && g.get('field_Q41').value) {
      return Number(g.get('field_Q120').value) > Number(g.get('field_Q41').value)
        ? null : {'wrongQ120': true};
    }
    else {
      return null;
    }
  }

  presentErrorAlert(p: string) {
    this.translateService.getDefaultLang();
    this.translateService.get('CALCULATOR_PAGE.ERRORS').subscribe(
      value => {
        let title, message;
        console.log(value);
        switch (p) {
          case 'wrong':
            title = value.WRONG.TITLE;
            message = value.WRONG.MESSAGE;
            break;
          case 'maths':
            title = value.MATHS.TITLE;
            message = value.MATHS.MESSAGE;
            break;
          default:
            title = value.GENERAL.TITLE;
            message = value.GENERAL.MESSAGE;
            break;
        }
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['Ok']
        });
        alert.present();
      }
    )
  }
}
