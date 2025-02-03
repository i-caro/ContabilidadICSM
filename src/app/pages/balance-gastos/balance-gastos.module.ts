import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalanceGastosPageRoutingModule } from './balance-gastos-routing.module';

import { BalanceGastosPage } from './balance-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalanceGastosPageRoutingModule
  ],
  declarations: [BalanceGastosPage]
})
export class BalanceGastosPageModule {}
