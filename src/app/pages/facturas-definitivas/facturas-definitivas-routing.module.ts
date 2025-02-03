import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasDefinitivasPage } from './facturas-definitivas.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasDefinitivasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasDefinitivasPageRoutingModule {}
