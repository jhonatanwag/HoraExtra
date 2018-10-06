import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HoraExtra} from '../../model/horaExtra';
import {HoraService} from '../../service/hora.service';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-editar-hora',
  templateUrl: 'editar-hora.html',
})
export class EditarHoraPage {private hora: HoraExtra = new HoraExtra();

constructor(public navCtrl: NavController, public navParams: NavParams,
public horaService: HoraService,private admobFree: AdMobFree) {
  this.mostrarPublicidadeInterstitial();
  this.hora = this.navParams.get("hora");
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

alterarHora(){
  if(this.hora.tipoHora == '50'){
    this.hora.valor=((this.hora.salario/this.hora.jornada)+((this.hora.salario/this.hora.jornada)*0.5))*this.hora.qtdHora;
  }else{
    this.hora.valor=((this.hora.salario/this.hora.jornada)+((this.hora.salario/this.hora.jornada)*1))*this.hora.qtdHora;
  }
  this.horaService.updateHora(this.hora);
  this.navCtrl.pop();
}

removerHora(){
  this.horaService.removeHora(this.hora);
  this.navCtrl.pop();
}

}
