import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaContablePageRoutingModule } from './ficha-contable-routing.module';

import { FichaContablePage } from './ficha-contable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaContablePageRoutingModule
  ],
  declarations: [FichaContablePage]
})
export class FichaContablePageModule {}
