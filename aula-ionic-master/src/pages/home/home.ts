import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';
import { Imc } from '../../model/imc';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage';
import { Database } from '../../data/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imc: Imc = new Imc();


  constructor(public navCtrl: NavController,
    public http: Http,
    public storage: Storage,
    public database: Database) {

  }

  cadastrarImcSqlite(){
    this.database.adicionarImc(this.imc);
  }

  consultarImcSqlite(){
    this.database.buscarImc().subscribe(data =>{
      console.log(data[0].nome);
    });
  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  cadastrarImcStorage(){
    this.storage.set('imc',this.imc);
  }
  buscarImc(){
    this.storage.get('imc').then((data) =>{
      console.log(data);
    });
  }

  removerImc(){
    this.storage.remove('imc');
  }



  cadastrarImc() {

    this.http.post("http://200.17.98.122:8080/hellows/rest/service/inserirImc", this.imc).retry(2).map(res => res.json()).subscribe(
      data => {
        alert(data.situacao);
        console.log(data);
      }, error => {
        alert(error);
      });
  }

  chamarDetalhesSemParametros() {
    this.navCtrl.push(DetalhesPage);
  }

  chamarDetalhesComParametros() {
    this.navCtrl.push(DetalhesPage, { 'usuario': this.imc.usuario });
  }

  definirDetalhesRaiz() {
    this.navCtrl.setRoot(DetalhesPage, { 'valor1': 10, 'valor2': 20, 'nome': 'José' });
  }

}
