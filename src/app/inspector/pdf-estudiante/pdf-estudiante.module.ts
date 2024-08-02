import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfEstudiantePageRoutingModule } from './pdf-estudiante-routing.module';

import { PdfEstudiantePage } from './pdf-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfEstudiantePageRoutingModule
  ],
  declarations: [PdfEstudiantePage]
})
export class PdfEstudiantePageModule {}
