import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Clipboard} from '@ionic-native/clipboard';
import {Storage} from '@ionic/storage';

import moment from 'moment';
import {ResultPage} from "../result/result";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public results = new Array([]);
  public isResults = false;
  public localeAdaptations: any = {"lang": "fr", "separator": ","};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private clipboard: Clipboard,
              private storage: Storage,
              private translateService: TranslateService,
              public plt: Platform) {

    this.setAccordingToLang();
    this.getResult();
  }

  presentToast(messageToShow: string) {
    let toast = this.toastCtrl.create({
      message: messageToShow,
      duration: 3000
    });
    toast.present();
  }

  roundResult(n) {
    return (Math.round(n)).toString().replace(".", this.localeAdaptations.separator);
  }

  showCorrectDate(date) {
    return moment(date).locale(this.localeAdaptations.lang).format('LLL');
  }

  setAccordingToLang() {
    let currentLanguage = this.translateService.getDefaultLang();
    switch (currentLanguage) {
      case 'fr':
        this.localeAdaptations.lang = "fr";
        this.localeAdaptations.separator = ",";
        break;
      case 'en':
        this.localeAdaptations.lang = "en";
        this.localeAdaptations.separator = ".";
        break;
      default:
        this.localeAdaptations.lang = "fr";
        this.localeAdaptations.separator = ",";
        break;
    }
  }

  getResult() {
    this.storage.get('results').then((val) => {
      if (!val || val === null) {
        this.isResults = false;
      }
      else {
        this.results = val.sort(function (a, b) {
          return -moment.utc(a.currentTime).diff(moment.utc(b.currentTime))
        });
        this.isResults = true;
      }
    });
  }

  resetLocalStorage() {
    this.results = new Array([]);
    this.isResults = false;
    this.storage.clear();
  }

  copyToClipBoard(result) {

    // TODO: links to App Stores
    let platform, lienStore;
    if (this.plt.is('ios')) {
      platform = "iOS";
      lienStore = "https://www.appstore.com/";
    }
    else if (this.plt.is('windows')) {
      platform = "Windows";
      lienStore = "https://www.microsoft.com/store/apps";
    }
    else {
      platform = "Android";
      lienStore = "https://play.google.com/";
    }

    let finalClipboard = "Tmax = " + (Math.round(result.data.TMax * 100) / 100).toString().replace(".", this.localeAdaptations.separator) + "°C" + "\n"
      + "\n"
      + "Ciment : " + this.typeCEM(result.data.inputVariables.CEM) + "" + "\n"
      + "C = " + result.data.inputVariables.C + "kg/m3" + "\n"
      + "A = " + (result.data.inputVariables.FS + result.data.inputVariables.AS + result.data.inputVariables.MK + result.data.inputVariables.LA + result.data.inputVariables.CV) + "kg/m3" + "\n"
      + "Mv = " + result.data.inputVariables.MV + "kg/m3" + "\n"
      + "Eeff = " + result.data.inputVariables.EEFF + "kg/m3" + "\n"
      + "RC2 = " + result.data.inputVariables.RC2 + "MPa" + "\n"
      + "RC28 = " + result.data.inputVariables.RC28 + "MPa" + "\n"
      + "Q41 = " + result.data.inputVariables.Q41 + "kJ/kg" + "\n"
      + "Q120 = " + result.data.inputVariables.Q120 + "kJ/kg" + "\n"
      + "Ep = " + result.data.inputVariables.EP + "m" + "\n"
      + "Tlim = " + result.data.inputVariables.TLIM + "°C" + "\n"
      + "\n"
      + "Via Tmax Béton sur " + platform + "\n"
      + lienStore;

    this.clipboard.copy(finalClipboard);
  }

  typeCEM(CEM) {
    let typeCEM;
    switch (CEM.toString()) {
      case "1":
        typeCEM = "CEM I";
        break;
      case "2":
        typeCEM = "CEM II";
        break;
      case "3":
        typeCEM = "CEM III";
        break;
      case "4":
        typeCEM = "CEM V";
        break;
      default:
        typeCEM = "CEM I";
        break;
    }
    return typeCEM;
  }

  copyResults(result) {
    this.translate.getDefaultLang();
    this.translate.get('HISTORY_PAGE.COPY_RESULTS').subscribe(
      value => {
        this.copyToClipBoard(result);
        let alertTitle = value;
        this.presentToast(alertTitle);
      }
    )
  }

  pushToResultPage(result) {
    this.navCtrl.push(ResultPage, {
      currentTime: moment(result.currentTime),
      Qm: result.data.Qm,
      LEch: result.data.LEch,
      coefReduc: result.data.coefReduc,
      deltaT: result.data.deltaT,
      TMax: result.data.TMax,
      inputVariables: result.data.inputVariables
    });
  }
}
