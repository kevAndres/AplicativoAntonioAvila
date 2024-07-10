import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteXestudiantePageRoutingModule } from './reporte-xestudiante-routing.module';

import { ReporteXestudiantePage } from './reporte-xestudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteXestudiantePageRoutingModule
  ],
  declarations: [ReporteXestudiantePage]
})
export class ReporteXestudiantePageModule {}
