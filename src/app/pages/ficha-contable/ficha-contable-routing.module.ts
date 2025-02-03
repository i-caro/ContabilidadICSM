import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaContablePage } from './ficha-contable.page';

const routes: Routes = [
  {
    path: '',
    component: FichaContablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaContablePageRoutingModule {}
