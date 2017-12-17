import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-method-modal',
  templateUrl: 'method-modal.html',
})
export class MethodModalPage {

  public stepNumber: number;
  public step_1_formulas: any[];
  public step_2_formulas: any[];
  public step_3_formulas: any[];
  public step_4_formulas: any[];
  public step_5_formulas: any[];
  public step_6_formulas: any[];

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.stepNumber = navParams.get('step');

    this.step_1_formulas = [
      {
        name: "[eq. 1]",
        formulae: "`Q_m=1,05xxQ_120`"
      },
      {
        name: "[eq. 2]",
        formulae: "`Q_m=1,15xxQ_120`"
      },
      {
        name: "[eq. 3]",
        formulae: "`Q_m=max(Q_41; Q_41 xx ratio_(Q_m/Q_41))`"
      },
      {
        name: "[eq. 4]",
        formulae: "`ratio_(Q_m/Q_41) = 1,71 – 1,16 xx \"Rc\"_2/\"Rc\"_28`"
      }
    ];
    this.step_2_formulas = [
      {
        name: "[eq. 5]",
        formulae: "`LEch = C + sum_(i=1) K’_i xx A_i `"
      },
      {
        name: "[eq. 6]",
        formulae: "`{(\"si EP\"<=1m\", \"K'_\"cv\"=0),(\"si EP\"<1m<=5m\", \"),(K'_\"cv\"=-0.0357xx\"EP\"^2+0.4143xx\"EP\"-0.38),(\"si EP\">5m\", \"1.12xx(1-e^(-\"EP\"/3))):}`"
      },
      {
        name: "[eq. 7]",
        formulae: "`K’_l = 1,12 xx (1- e^(-\"EP\"/3))`"
      }
    ];
    this.step_3_formulas = [
      "`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`"
    ];
    this.step_4_formulas = [
      "`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`"
    ];
    this.step_5_formulas = [
      "`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`"
    ];
    this.step_6_formulas = [
      "`sum_(i=1)^n i^3=((n(n+1))/2)^2 + [[a,b],[c,d]]`"
    ];

  }

  ionViewDidEnter() {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
