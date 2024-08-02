import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteCrudPage } from './docente-crud.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteCrudPageRoutingModule {}
