import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinutasProformaPage } from './minutas-proforma.page';

const routes: Routes = [
  {
    path: '',
    component: MinutasProformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutasProformaPageRoutingModule {}
