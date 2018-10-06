import {Injectable} from '@angular/core';
import {HoraExtra} from '../model/horaExtra';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class HoraService{

  itemsCollection: AngularFirestoreCollection<HoraExtra> = this.afs.collection<HoraExtra>('hora');

  constructor(private afs: AngularFirestore){}
  getHoras(){
    return this.itemsCollection;
  }
  addHora(hora:HoraExtra){
    const id = this.afs.createId();
    hora.key = id;
    this.itemsCollection.doc(id).set(JSON.parse(JSON.stringify(hora)));
  }
  updateHora(hora:HoraExtra){
    return this.itemsCollection.doc(hora.key).update(hora);
  }
  removeHora(hora:HoraExtra){
    return this.itemsCollection.doc(hora.key).delete();
  }
}
