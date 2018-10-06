import {Injectable} from '@angular/core';
import {Imc} from '../model/imc';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class ImcService{

  itemsCollection: AngularFirestoreCollection<Imc> = this.afs.collection<Imc>('imc');

  constructor(private afs: AngularFirestore){}
  getImcs(){
    return this.itemsCollection;
  }
  addImc(imc:Imc){
    const id = this.afs.createId();
    imc.key = id;
    this.itemsCollection.doc(id).set(JSON.parse(JSON.stringify(imc)));
  }
  updateImc(imc:Imc){
    return this.itemsCollection.doc(imc.key).update(imc);
  }
  removeImc(imc:Imc){
    return this.itemsCollection.doc(imc.key).delete();
  }
}
