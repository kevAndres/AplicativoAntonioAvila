import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaAtrasosRepresentanteComponent } from '../../../Component/VistaAtrasosRepresentante/vista-atrasos-representante/vista-atrasos-representante.component';

import { VistaAtrasosRepresentantePage } from './vista-atrasos-representante.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAtrasosRepresentanteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAtrasosRepresentantePageRoutingModule {}
