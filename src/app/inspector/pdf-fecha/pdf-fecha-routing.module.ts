import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfFechaPage } from './pdf-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: PdfFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfFechaPageRoutingModule {}
