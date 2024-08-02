import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfFechaPageRoutingModule } from './pdf-fecha-routing.module';

import { PdfFechaPage } from './pdf-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfFechaPageRoutingModule
  ],
  declarations: [PdfFechaPage]
})
export class PdfFechaPageModule {}
