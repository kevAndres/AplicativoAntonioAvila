import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../all-atrasos/all-atrasos.module').then(m => m.AllAtrasosPageModule)
      },
      {
        path: 'atrasos',
        loadChildren: () => import('../../atrasos/atrasos.module').then(m => m.AtrasosPageModule)
      },
      {
        path: 'filtros',
        loadChildren: () => import('../../inspector/filtros/filtros.module').then(m => m.FiltrosPageModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
