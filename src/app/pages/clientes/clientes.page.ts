import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalClienteComponent } from 'src/app/core/components/cliente-component/modal-cliente.component';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/core/models/cliente.model';
import { PdfGeneratorService } from 'src/app/core/services/pdf-generator.service';
import { FichaContableService } from 'src/app/core/services/ficha-contable.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  searchText: string = ''; 

  constructor(
    private modalCtrl: ModalController,
    private clienteService: ClienteService,
    private alertController: AlertController,
    private toastController: ToastController,
    private pdfService: PdfGeneratorService,
  ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: clientes => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
        console.log("Clientes obtenidos:", this.clientes);
      },
      error: err => {
        console.error("Error al obtener clientes:", err);
      }
    });
  }

  filtrarClientes() {
    const texto = this.quitarTildes(this.searchText.toLowerCase().trim());

    if (texto === '') {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        this.quitarTildes(cliente.nombre.toLowerCase()).includes(texto) ||
        this.quitarTildes(cliente.correo.toLowerCase()).includes(texto) ||
        this.quitarTildes(cliente.telefono.toLowerCase()).includes(texto) ||
        (cliente.nif_nie && this.quitarTildes(cliente.nif_nie.toLowerCase()).includes(texto))
      );
    }
  }

  quitarTildes(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

  async generarPDF(cliente: Cliente){
    this.pdfService.generatePdf(cliente)
  }
}

