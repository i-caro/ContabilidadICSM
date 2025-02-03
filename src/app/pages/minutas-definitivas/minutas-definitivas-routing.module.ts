import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinutasDefinitivasPage } from './minutas-definitivas.page';

const routes: Routes = [
  {
    path: '',
    component: MinutasDefinitivasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutasDefinitivasPageRoutingModule {}
