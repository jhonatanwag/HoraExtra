import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Imc } from '../../model/imc';
import {EditarImcPage} from '../editar-imc/editar-imc';
import {ImcService} from '../../service/imc.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

/*
import * as firebase from "firebase";
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private imc: Imc = new Imc();
  items: Observable<Imc[]>

  constructor(public navCtrl: NavController, private imcService: ImcService, private admobFree: AdMobFree, private platform:Platform) {
    this.items = this.imcService.getImcs().valueChanges();
    this.mostrarPublicidadeBanner();
  }

  mostrarPublicidadeBanner(){

    //if(this.platform.is('android')){
      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config:
        id:'	ca-app-pub-3940256099942544/6300978111',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
    }
//  }

  /*  ref = firebase.database().ref("imc/");
  imcs = [];*/

  /*constructor(public navCtrl: NavController) {
  this.ref.on('value', resp => {
  this.imcs = [];
  this.imcs = snapshotToArray(resp);
})
}*/

converterNumber(numero): number {
  return parseFloat(numero);
}

cadastrarImc(){
  /*  let novoImc = this.ref.push();
  novoImc.set(this.imc);*/
  this.imcService.addImc(this.imc);
}

editarRemover(imcEditarRemover: Imc) {
  this.navCtrl.push(EditarImcPage, {imc: imcEditarRemover});
}

}

/*export const snapshotToArray= snapshot=>{
var returnArr = [];
snapshot.forEach(childSnapshot => {
var item = childSnapshot.val();
item.key = childSnapshot.key;
returnArr.push(item);
});
return returnArr;
};*/
