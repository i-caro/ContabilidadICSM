import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'minutas-definitivas',
    loadChildren: () => import('./pages/minutas-definitivas/minutas-definitivas.module').then( m => m.MinutasDefinitivasPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'minutas-proforma',
    loadChildren: () => import('./pages/minutas-proforma/minutas-proforma.module').then( m => m.MinutasProformaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'posicion-cliente',
    loadChildren: () => import('./pages/posicion-cliente/posicion-cliente.module').then( m => m.PosicionClientePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'balance-gastos',
    loadChildren: () => import('./pages/balance-gastos/balance-gastos.module').then( m => m.BalanceGastosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'facturas-definitivas',
    loadChildren: () => import('./pages/facturas-definitivas/facturas-definitivas.module').then( m => m.FacturasDefinitivasPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'facturas-proforma',
    loadChildren: () => import('./pages/facturas-proforma/facturas-proforma.module').then( m => m.FacturasProformaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ficha-contable',
    loadChildren: () => import('./pages/ficha-contable/ficha-contable.module').then( m => m.FichaContablePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
