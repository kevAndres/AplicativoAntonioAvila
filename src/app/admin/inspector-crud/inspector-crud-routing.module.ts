import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectorCrudPage } from './inspector-crud.page';

const routes: Routes = [
  {
    path: '',
    component: InspectorCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectorCrudPageRoutingModule {}
