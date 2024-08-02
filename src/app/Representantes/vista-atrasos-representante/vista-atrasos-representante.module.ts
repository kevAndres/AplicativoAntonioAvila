import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAtrasosRepresentantePageRoutingModule } from './vista-atrasos-representante-routing.module';
import { VistaAtrasosRepresentanteComponent } from '../../../Component/VistaAtrasosRepresentante/vista-atrasos-representante/vista-atrasos-representante.component';

import { VistaAtrasosRepresentantePage } from './vista-atrasos-representante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAtrasosRepresentantePageRoutingModule
  ],
  declarations: [VistaAtrasosRepresentantePage,VistaAtrasosRepresentanteComponent]
})
export class VistaAtrasosRepresentantePageModule {}
