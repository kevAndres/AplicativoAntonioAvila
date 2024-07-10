import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteXcursoPageRoutingModule } from './reporte-xcurso-routing.module';

import { ReporteXcursoPage } from './reporte-xcurso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteXcursoPageRoutingModule
  ],
  declarations: [ReporteXcursoPage]
})
export class ReporteXcursoPageModule {}
