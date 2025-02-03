import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasProformaPageRoutingModule } from './facturas-proforma-routing.module';

import { FacturasProformaPage } from './facturas-proforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasProformaPageRoutingModule
  ],
  declarations: [FacturasProformaPage]
})
export class FacturasProformaPageModule {}
