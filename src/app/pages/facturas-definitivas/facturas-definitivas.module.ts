import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasDefinitivasPageRoutingModule } from './facturas-definitivas-routing.module';

import { FacturasDefinitivasPage } from './facturas-definitivas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasDefinitivasPageRoutingModule
  ],
  declarations: [FacturasDefinitivasPage]
})
export class FacturasDefinitivasPageModule {}
