import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NivelAcademicoPageRoutingModule } from './nivel-academico-routing.module';

import { NivelAcademicoPage } from './nivel-academico.page';
import { RegistroNivelAcademicoComponent } from 'src/Component/regsitro-nivel-academico/regsitro-nivel-academico.component';
import { EditNivelesAcademicosComponent } from 'src/Component/edit-niveles-academicos/edit-niveles-academicos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NivelAcademicoPageRoutingModule,
  ],
  declarations: [
    NivelAcademicoPage,
    RegistroNivelAcademicoComponent,
    EditNivelesAcademicosComponent,
  ],
})
export class NivelAcademicoPageModule {}
