import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Imc } from '../model/imc';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Database {

  theConsole: string = "Console Messages";

  options: any = {
    name: 'aula.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connectDb();
  }

  private connectDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS imc (nome VARCHAR(255), peso real, altura real)';
        this.db.executeSql(sql, {})
          .then(() => console.log("SQL " + sql))
          .catch(e => console.log("Erro " + e));
      }).catch(e => console.log("Erro " + e));

  }

  adicionarImc(imc: Imc): void {

    var sql = "INSERT INTO imc (nome,peso, altura) VALUES ('" + imc.nome + "'," + imc.peso + "," + imc.altura + ")";

    this.db.executeSql(sql, {})
      .then(() => console.log("SQL " + sql))
      .catch(e => console.log("Erro " + e));
  }
  buscarImc() {
    var sql = "SELECT * FROM imc";
    return Observable.create((observer) => {
      this.db.executeSql(sql, {})
        .then((result) => {
          let items: Imc[] = [];
          if (result.rows.length > 0) {
            for (var x = 0; x < result.rows.length; x++) {
              let imc: Imc = new Imc();
              imc.nome = result.rows.item(x).nome;
              imc.peso = result.rows.item(x).peso;
              imc.altura = result.rows.item(x).altura;
              items.push(imc);
            }
          }
          observer.next(items);
          observer.complete();
        })
        .catch(e => {
          console.log("Erro " + e);
          alert("Errorr " + e);
        });
    }, error => {
      alert("Errorr " + error);
    });

  }








}
