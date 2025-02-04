import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: 'minutas-definitivas',
    loadChildren: () => import('./pages/minutas-definitivas/minutas-definitivas.module').then( m => m.MinutasDefinitivasPageModule)
  },
  {
    path: 'minutas-proforma',
    loadChildren: () => import('./pages/minutas-proforma/minutas-proforma.module').then( m => m.MinutasProformaPageModule)
  },
  {
    path: 'posicion-cliente',
    loadChildren: () => import('./pages/posicion-cliente/posicion-cliente.module').then( m => m.PosicionClientePageModule)
  },
  {
    path: 'balance-gastos',
    loadChildren: () => import('./pages/balance-gastos/balance-gastos.module').then( m => m.BalanceGastosPageModule)
  },
  {
    path: 'facturas-definitivas',
    loadChildren: () => import('./pages/facturas-definitivas/facturas-definitivas.module').then( m => m.FacturasDefinitivasPageModule)
  },
  {
    path: 'facturas-proforma',
    loadChildren: () => import('./pages/facturas-proforma/facturas-proforma.module').then( m => m.FacturasProformaPageModule)
  },
  {
    path: 'ficha-contable',
    loadChildren: () => import('./pages/ficha-contable/ficha-contable.module').then( m => m.FichaContablePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
