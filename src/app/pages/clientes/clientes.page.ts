import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalClienteComponent } from 'src/app/core/components/modal-cliente.component';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/core/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente | undefined;

  constructor(
    private modalCtrl: ModalController,
    private clienteService: ClienteService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: clientes => {
        this.clientes = clientes;
        console.log("Clientes obtenidos:", this.clientes);
      },
      error: err => {
        console.error("Error al obtener clientes:", err);
      }
    });
  }

  async agregarCliente() {
    const modal = await this.modalCtrl.create({
      component: ModalClienteComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.cliente) {
      await this.clienteService.agregarCliente(data.cliente);
      this.mostrarToast('Cliente agregado con éxito');
    }
  }

  async actualizarCliente(cliente: Cliente) {
    const modal = await this.modalCtrl.create({
      component: ModalClienteComponent,
      componentProps: { cliente }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data && data.cliente) {
      await this.clienteService.editarCliente(data.cliente);
      this.mostrarToast('Cliente actualizado con éxito');
    }
  }

  async eliminarCliente(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Cliente',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.clienteService.eliminarCliente(id);
            this.mostrarToast('Cliente eliminado');
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

