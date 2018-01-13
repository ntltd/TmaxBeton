import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GuideDocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guide-doc',
  templateUrl: 'guide-doc.html',
})
export class GuideDocPage {

  public guidePages = [
    "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010",
    "0011", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020",
    "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030",
    "0031", "0032", "0033", "0034", "0035", "0036", "0037", "0038", "0039", "0040",
    "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "0050",
    "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "0060",
    "0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "0070",
    "0071", "0072", "0073"
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

}
