import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarImcPage } from './editar-imc';

@NgModule({
  declarations: [
    EditarImcPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarImcPage),
  ],
})
export class EditarImcPageModule {}
