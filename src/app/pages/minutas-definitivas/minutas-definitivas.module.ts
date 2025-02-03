import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinutasDefinitivasPageRoutingModule } from './minutas-definitivas-routing.module';

import { MinutasDefinitivasPage } from './minutas-definitivas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutasDefinitivasPageRoutingModule
  ],
  declarations: [MinutasDefinitivasPage]
})
export class MinutasDefinitivasPageModule {}
