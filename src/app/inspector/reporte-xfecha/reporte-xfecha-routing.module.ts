import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteXfechaPage } from './reporte-xfecha.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteXfechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteXfechaPageRoutingModule {}
