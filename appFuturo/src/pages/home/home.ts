import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Imc } from '../../model/imc';
import { HoraExtra } from '../../model/horaExtra';
import {EditarImcPage} from '../editar-imc/editar-imc';
import {EditarHoraPage} from '../editar-hora/editar-hora';
import {ImcService} from '../../service/imc.service';
import {HoraService} from '../../service/hora.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private imc: Imc = new Imc();
  items: Observable<Imc[]>
  private hora: HoraExtra = new HoraExtra();
  horas: Observable<HoraExtra[]>

  constructor(public navCtrl: NavController, private horaService: HoraService, private admobFree: AdMobFree, private platform:Platform) {
    this.horas = this.horaService.getHoras().valueChanges();
    this.mostrarPublicidadeBanner();
  }

  mostrarPublicidadeBanner(){
    const bannerConfig: AdMobFreeBannerConfig = {
      //id:'ca-app-pub-3940256099942544/6300978111',
      id:'ca-app-pub-5521415824714919/4438520538',//minha publicidade
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
    .then(() => {
    })
    .catch(e => console.log(e));
  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  /*cadastrarImc(){
  this.imcService.addImc(this.imc);
}*/

cadastrarHora(){
  if(this.hora.tipoHora == '50'){
    this.hora.valor=((this.hora.salario/this.hora.jornada)+((this.hora.salario/this.hora.jornada)*0.5))*this.hora.qtdHora;
  }else{
    this.hora.valor=((this.hora.salario/this.hora.jornada)+((this.hora.salario/this.hora.jornada)*1))*this.hora.qtdHora;
  }
  this.horaService.addHora(this.hora);
}

editarRemover(horaEditarRemover: HoraExtra) {
  this.navCtrl.push(EditarHoraPage, {hora: horaEditarRemover});
}

}
