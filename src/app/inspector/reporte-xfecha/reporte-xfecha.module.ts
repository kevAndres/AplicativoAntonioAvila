import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteXfechaPageRoutingModule } from './reporte-xfecha-routing.module';

import { ReporteXfechaPage } from './reporte-xfecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteXfechaPageRoutingModule
  ],
  declarations: [ReporteXfechaPage]
})
export class ReporteXfechaPageModule {}
