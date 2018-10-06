import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Imc} from '../../model/imc';
import {ImcService} from '../../service/imc.service';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-editar-imc',
  templateUrl: 'editar-imc.html',
})
export class EditarImcPage {

  private imc: Imc = new Imc();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private admobFree: AdMobFree,  public imcService: ImcService) {
    this.mostrarPublicidadeInterstitial();
    this.imc = this.navParams.get("imc");
  }

  mostrarPublicidadeInterstitial(){
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      id:'ca-app-pub-3940256099942544/1033173712',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare()
    .then(() => {
    })
    .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarImcPage');
  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  alterarImc(){
    this.imcService.updateImc(this.imc);
    this.navCtrl.pop();
  }

  removerImc(){
    this.imcService.removeImc(this.imc);
    this.navCtrl.pop();
  }

}
