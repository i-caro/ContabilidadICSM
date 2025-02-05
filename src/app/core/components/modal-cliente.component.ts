import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../models/cliente.model';


@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalClienteComponent {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    direccion: '',
    nif_nie: '',
    correo: '',
    telefono: '',
    observaciones: '',
    isDebtor: false
  };

  constructor(private modalCtrl: ModalController) {}

  guardarCliente() {
    if (this.cliente.nombre && this.cliente.correo && this.cliente.telefono) {
      this.modalCtrl.dismiss({ cliente: this.cliente });
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}