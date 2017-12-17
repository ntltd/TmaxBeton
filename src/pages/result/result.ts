import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  public Qm: number;
  public LEch: number;
  public coefReduc: number;
  public deltaT: number;
  public TMax: string;
  public currentTime: any;
  public inputVariables: any;
  public sumAdditions: number;
  public CEM: string;
  public localeAdaptations: any = {"lang": "fr", "separator": ","};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private translateService: TranslateService) {

    this.setAccordingToLang();

    this.Qm = this.navParams.get('Qm');
    this.LEch = this.navParams.get('LEch');
    this.coefReduc = this.navParams.get('coefReduc');
    this.deltaT = this.navParams.get('deltaT');
    this.TMax = (Math.round(this.navParams.get('TMax') * 100) / 100).toString().replace(".", this.localeAdaptations.separator);
    this.currentTime = this.navParams.get('currentTime').locale(this.localeAdaptations.lang).format('LLL');
    this.inputVariables = this.navParams.get('inputVariables');

    switch (this.inputVariables.CEM.toString()){
      case "1":
        this.CEM = "CEM I";
        break;
      case "2":
        this.CEM = "CEM II";
        break;
      case "3":
        this.CEM = "CEM III";
        break;
      case "4":
        this.CEM = "CEM V";
        break;
      default:
        this.CEM = "CEM I";
        break;
    }

    this.sumAdditions = this.inputVariables.FS + this.inputVariables.MK + this.inputVariables.AS + this.inputVariables.CV + this.inputVariables.LA;

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
}
