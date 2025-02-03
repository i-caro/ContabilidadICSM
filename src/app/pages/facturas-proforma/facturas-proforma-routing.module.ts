import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasProformaPage } from './facturas-proforma.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasProformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasProformaPageRoutingModule {}
