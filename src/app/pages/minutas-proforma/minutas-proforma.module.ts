import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinutasProformaPageRoutingModule } from './minutas-proforma-routing.module';

import { MinutasProformaPage } from './minutas-proforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutasProformaPageRoutingModule
  ],
  declarations: [MinutasProformaPage]
})
export class MinutasProformaPageModule {}
