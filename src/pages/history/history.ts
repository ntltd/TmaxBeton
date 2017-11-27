import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Clipboard} from '@ionic-native/clipboard';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private clipboard: Clipboard,
              private storage: Storage) {
    translate.getDefaultLang();
  }

  presentToast(messageToShow: string) {
    let toast = this.toastCtrl.create({
      message: messageToShow,
      duration: 3000
    });
    toast.present();
  }

  //TODO: get results from storage
  getResult() {
    this.storage.get('').then((val) => {
      console.log('', val);
    });
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
}
