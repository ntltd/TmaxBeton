import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
              private translateService: TranslateService) {

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

  roundResult(result){
    return (Math.round(result*100)/100).toString().replace(".", this.localeAdaptations.separator);
  }

  showCorrectDate(date){
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
          return - moment.utc(a.currentTime).diff(moment.utc(b.currentTime))
        });
        this.isResults = true;
      }
    });
  }

  resetLocalStorage(){
    this.results = new Array([]);
    this.isResults = false;
    this.storage.clear();
  }

  copyToClipBoard() {
    this.clipboard.copy('[DATE]');
  }

  copyResults() {
    this.translate.getDefaultLang();
    this.translate.get('HISTORY_PAGE.COPY_RESULTS').subscribe(
      value => {
        this.copyToClipBoard();
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
