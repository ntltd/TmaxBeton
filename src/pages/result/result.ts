import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Clipboard} from "@ionic-native/clipboard";

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
              private translateService: TranslateService,
              public toastCtrl: ToastController,
              public plt: Platform,
              private clipboard: Clipboard) {

    this.setAccordingToLang();

    this.Qm = this.navParams.get('Qm');
    this.LEch = this.navParams.get('LEch');
    this.coefReduc = this.navParams.get('coefReduc');
    this.deltaT = this.navParams.get('deltaT');
    this.TMax = (Math.round(this.navParams.get('TMax'))).toString().replace(".", this.localeAdaptations.separator);
    this.currentTime = this.navParams.get('currentTime').locale(this.localeAdaptations.lang).format('LLL');
    this.inputVariables = this.navParams.get('inputVariables');

    switch (this.inputVariables.CEM.toString()) {
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

    this.sumAdditions = Number(this.inputVariables.FS) + Number(this.inputVariables.AS) + Number(this.inputVariables.MK) + Number(this.inputVariables.LA) + Number(this.inputVariables.CV);

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

  copyToClipBoard() {

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

    let finalClipboard = "Tmax = " + (Math.round(Number(this.TMax))).toString().replace(".", this.localeAdaptations.separator) + "°C" + "\n"
      + "\n"
      + "Ciment : " + this.typeCEM(this.inputVariables.CEM) + "" + "\n"
      + "C = " + this.inputVariables.C + "kg/m3" + "\n"
      + "A = " + this.sumAdditions + "kg/m3" + "\n"
      + "Mv = " + this.inputVariables.MV + "kg/m3" + "\n"
      + "Eeff = " + this.inputVariables.EEFF + "kg/m3" + "\n"
      + "RC2 = " + this.inputVariables.RC2 + "MPa" + "\n"
      + "RC28 = " + this.inputVariables.RC28 + "MPa" + "\n"
      + "Q41 = " + this.inputVariables.Q41 + "kJ/kg" + "\n"
      + "Q120 = " + this.inputVariables.Q120 + "kJ/kg" + "\n"
      + "Ep = " + this.inputVariables.EP + "m" + "\n"
      + "Tlim = " + this.inputVariables.TLIM + "°C" + "\n"
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

  copyResults() {
    this.translateService.getDefaultLang();
    this.translateService.get('HISTORY_PAGE.COPY_RESULTS').subscribe(
      value => {
        this.copyToClipBoard();
        let alertTitle = value;
        this.presentToast(alertTitle);
      }
    )
  }

  presentToast(messageToShow: string) {
    let toast = this.toastCtrl.create({
      message: messageToShow,
      duration: 3000
    });
    toast.present();
  }
}
