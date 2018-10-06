import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarHoraPage } from './editar-hora';

@NgModule({
  declarations: [
    EditarHoraPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarHoraPage),
  ],
})
export class EditarHoraPageModule {}
