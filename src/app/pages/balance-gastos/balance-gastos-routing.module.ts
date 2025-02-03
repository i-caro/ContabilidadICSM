import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceGastosPage } from './balance-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: BalanceGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceGastosPageRoutingModule {}
