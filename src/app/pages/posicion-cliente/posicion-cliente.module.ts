import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosicionClientePageRoutingModule } from './posicion-cliente-routing.module';

import { PosicionClientePage } from './posicion-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosicionClientePageRoutingModule
  ],
  declarations: [PosicionClientePage]
})
export class PosicionClientePageModule {}
