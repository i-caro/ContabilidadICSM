import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosicionClientePage } from './posicion-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: PosicionClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosicionClientePageRoutingModule {}
