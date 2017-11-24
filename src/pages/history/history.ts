import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public translate: TranslateService) {
    translate.getDefaultLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  presentToast(messageToShow: string) {
    let toast = this.toastCtrl.create({
      message: messageToShow,
      duration: 3000
    });
    toast.present();
  }

  copyResults(){
    this.translate.getDefaultLang();
    this.translate.get('HISTORY_PAGE.COPY_RESULTS').subscribe(
      value => {
        let alertTitle = value;
        this.presentToast(alertTitle);
      }
    )
  }
}
