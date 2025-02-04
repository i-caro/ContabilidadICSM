import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { Client } from '../models/cliente.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalClienteComponent {
  cliente: Client = {
    name: '',
    surname: '',
    address: '',
    nif_nie: '',
    email: '',
    phone: '',
    observations: '',
    isDebtor: false
  };

  constructor(private modalCtrl: ModalController, private clientesService: ClientesService) {}

  async guardarCliente() {
    if (this.cliente.name && this.cliente.email) {
      await this.clientesService.addCliente(this.cliente);
      this.modalCtrl.dismiss();
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}