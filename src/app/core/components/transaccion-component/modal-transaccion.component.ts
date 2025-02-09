import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaccion } from '../../models/ficha-contable.model';

@Component({
  selector: 'app-modal-transaccion',
  templateUrl: './modal-transaccion.component.html',
  styleUrls: ['./modal-transaccion.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalTransaccionComponent {
  @Input() clienteId!: string;

  transaccion: Transaccion = {
    clienteId: '',
    descripcion: '',
    monto: 0,
    pagado: false,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.clienteId) {
      this.transaccion.clienteId = this.clienteId;
    }
  }

  guardarTransaccion() {
    if (this.transaccion.descripcion && this.transaccion.monto > 0) {
      this.modalCtrl.dismiss({ transaccion: this.transaccion });
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
