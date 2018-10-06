import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
imc={};
listaImc=[];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  converterNumber(numero):number{
    return parseFloat(numero);
    console.log("Console Construtor");
  }

  calcularImc(){
    //this.imc.resultado = parseFloat(this.imc.peso) / Math.pow(parseFloat(this.imc.altura),2);
    this.imc.resultado = this.imc.peso / Math.pow(this.imc.altura,2);
    this.listaImc.push(this.imc);
    this.imc={peso:'',altura:'',nome:'',resultado:''};
  }

  exibirImc(imcLista){
    this.alertCtrl.create({
      title: 'Dados IMC',
      subTitle: 'Olá '+ imcLista.nome+' , o seu IMC é '+imcLista.resultado,
      buttons: ['OK']
    }).present();

  }
}
