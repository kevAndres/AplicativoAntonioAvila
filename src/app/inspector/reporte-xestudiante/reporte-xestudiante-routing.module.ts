import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteXestudiantePage } from './reporte-xestudiante.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteXestudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteXestudiantePageRoutingModule {}
